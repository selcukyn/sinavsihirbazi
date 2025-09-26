
import os
import json
import re
from pdf2image import convert_from_path
from google.cloud import vision
from google.protobuf.json_format import MessageToJson

# --- Helper Functions for Analysis ---

def get_text_from_block_data(block_data):
    """Extracts the full text content from a Vision API block dictionary."""
    full_text = ""
    if 'paragraphs' not in block_data: return ""
    for paragraph in block_data.get('paragraphs', []):
        for word in paragraph.get('words', []):
            for symbol in word.get('symbols', []):
                full_text += symbol.get('text', '')
            full_text += " "
    return full_text.strip()

def is_option_marker(text):
    """Checks if a text block looks like a multiple-choice option marker (e.g., "A)", "B) ")."""
    return re.match(r"^[A-Ea-e]\s*[\)\.]", text.strip())

def is_question_marker_block(text):
    """Checks if a block is a question number marker, allowing for spaces."""
    return re.search(r"^\d+\s*$", text.strip()) or re.search(r"Soru\s*No\s*:\s*\d+", text.strip(), re.IGNORECASE)

def get_question_number_from_source(text):
    """Extracts the integer question number from a source string like 'Soru No: 12' or just '12'."""
    match = re.search(r'\d+', text)
    return int(match.group(0)) if match else -1

# --- Main Parsing Logic ---

def parse_vision_response(page_json_path):
    """Parses a saved Google Cloud Vision JSON response to extract structured questions."""
    with open(page_json_path, 'r', encoding='utf-8') as f:
        response_data = json.load(f)
    
    if 'fullTextAnnotation' not in response_data or not response_data['fullTextAnnotation'].get('pages'):
        return []

    page = response_data['fullTextAnnotation']['pages'][0]
    page_width = page.get('width', 0)
    page_height = page.get('height', 0)
    
    if not page.get('blocks'):
        return []

    all_blocks = page.get('blocks', [])
    left_column_blocks = []
    right_column_blocks = []

    # Separate blocks into two columns
    for block_data in all_blocks:
        if 'boundingBox' not in block_data or 'vertices' not in block_data['boundingBox']:
            continue
        avg_x = sum(v.get('x', 0) for v in block_data['boundingBox']['vertices']) / 4
        if avg_x < page_width / 2:
            left_column_blocks.append(block_data)
        else:
            right_column_blocks.append(block_data)
    
    extracted_questions = []

    for column_blocks in [left_column_blocks, right_column_blocks]:
        column_blocks.sort(key=lambda b: b['boundingBox']['vertices'][0].get('y', 0))

        question_markers = []
        for i, block_data in enumerate(column_blocks):
            text = get_text_from_block_data(block_data)
            if is_question_marker_block(text):
                q_num = get_question_number_from_source(text)
                if 1 <= q_num <= 50: # Assuming questions are numbered 1-50
                    question_markers.append({'block': block_data, 'index': i, 'number': q_num})

        # Sort markers by question number to handle cases where OCR reads them out of order
        question_markers.sort(key=lambda m: m['number'])

        for i, marker_info in enumerate(question_markers):
            marker_block = marker_info['block']
            current_marker_text = get_text_from_block_data(marker_block)
            
            question_body_parts = []
            options = {}
            last_option_letter = None

            # Find all relevant blocks for this question based on index
            start_index = marker_info['index'] + 1
            end_index = len(column_blocks)
            if i + 1 < len(question_markers):
                end_index = question_markers[i+1]['index']

            # Adjust start_index to capture question text that might be just before the number
            current_y = marker_block['boundingBox']['vertices'][0].get('y', 0)
            if marker_info['index'] > 0:
                 prev_block = column_blocks[marker_info['index']-1]
                 prev_block_text = get_text_from_block_data(prev_block)
                 if not is_question_marker_block(prev_block_text) and not is_option_marker(prev_block_text) and "ÖSYM" not in prev_block_text:
                     question_body_parts.append(prev_block_text.strip())

            for j in range(start_index, end_index):
                block_data = column_blocks[j]
                block_text = get_text_from_block_data(block_data).strip()
                
                if not block_text or "ÖSYM" in block_text:
                    continue

                if is_option_marker(block_text):
                    option_letter = block_text[0].upper()
                    option_text = re.sub(r"^[A-Ea-e]\s*[\)\.]\s*", "", block_text).strip()
                    
                    if option_text:
                        options[option_letter] = option_text
                        last_option_letter = None
                    else: # Handle cases where option letter and text are in different blocks
                        last_option_letter = option_letter
                elif last_option_letter and block_text:
                    options[last_option_letter] = block_text
                    last_option_letter = None
                elif not options: # If we haven't found any options yet, it's part of the question body
                    question_body_parts.append(block_text)
            
            # The actual question text is often the block immediately after the number
            if question_body_parts:
                 question_text = " ".join(question_body_parts).strip()
            else: # Fallback if question text parsing fails
                 question_text = "Soru metni okunamadı."

            if question_text and len(options) == 5:
                extracted_questions.append({
                    "questionNumber": marker_info['number'],
                    "questionText": question_text,
                    "options": dict(sorted(options.items())),
                    "sourcePage": os.path.basename(page_json_path)
                })
                
    return extracted_questions

def analyze_pdf_and_parse(pdf_path, output_folder="."):
    raw_json_folder = os.path.join(output_folder, "raw_vision_responses")

    if not os.path.exists(raw_json_folder):
        os.makedirs(raw_json_folder)

    # Stage 1: Call Vision API only if JSON files are not already there
    json_files_exist = any(f.endswith('.json') for f in os.listdir(raw_json_folder))
    if not json_files_exist:
        print("No existing JSONs found. Calling Vision API...")
        client = vision.ImageAnnotatorClient()
        print(f"Converting PDF '{pdf_path}' to images...")
        images = convert_from_path(pdf_path)
        for i, page_image in enumerate(images):
            page_num = i + 1
            print(f"Analyzing page {page_num}...")
            
            image_path = os.path.join(raw_json_folder, f"temp_page_{page_num}.png")
            page_image.save(image_path, "PNG")

            with open(image_path, "rb") as f: content = f.read()
            image = vision.Image(content=content)
            response = client.document_text_detection(image=image)

            if response.error.message:
                os.remove(image_path)
                raise Exception(f"Vision API Error on page {page_num}: {response.error.message}")

            response_json_str = MessageToJson(response._pb)
            raw_json_path = os.path.join(raw_json_folder, f"page_{page_num}_vision_response.json")
            with open(raw_json_path, "w", encoding='utf-8') as json_file: json_file.write(response_json_str)
            
            os.remove(image_path)
            print(f"Saved raw Vision API response for page {page_num}.")
    else:
        print("Raw vision response files already exist. Skipping API calls.")

    # Stage 2: Parse the saved JSON files
    print("\n--- Parsing all generated JSON files ---")
    all_parsed_questions = []
    
    try:
        json_files = sorted(
            [f for f in os.listdir(raw_json_folder) if f.endswith('.json')], 
            key=lambda x: int(re.search(r'(\d+)', x).group(1))
        )
    except (ValueError, AttributeError):
        print("Warning: Could not sort JSON files by number. Processing in default order.")
        json_files = [f for f in os.listdir(raw_json_folder) if f.endswith('.json')]

    for json_file_name in json_files:
        raw_json_path = os.path.join(raw_json_folder, json_file_name)
        page_num_str = re.search(r'\d+', json_file_name).group() if re.search(r'\d+', json_file_name) else 'N/A'
        
        print(f"Parsing {raw_json_path}...")
        page_questions = parse_vision_response(raw_json_path)
        all_parsed_questions.extend(page_questions)
        print(f"Found {len(page_questions)} questions on page {page_num_str}.")
    
    # Sort all questions by their parsed number to ensure correct order
    all_parsed_questions.sort(key=lambda q: q.get('questionNumber', 0))
    
    # Remove duplicates, keeping the first one found
    unique_questions = {}
    for q in all_parsed_questions:
        if q['questionNumber'] not in unique_questions:
            unique_questions[q['questionNumber']] = q

    final_questions = list(unique_questions.values())
    final_questions.sort(key=lambda q: q.get('questionNumber', 0))

    return final_questions

if __name__ == "__main__":
    PDF_FILE_PATH = "docs/2025 ALES 2 SİNAV SORULARI.pdf"
    FINAL_OUTPUT_PATH = "src/lib/questions_from_pdf.json"
    
    os.makedirs(os.path.dirname(FINAL_OUTPUT_PATH), exist_ok=True)

    if os.path.exists(PDF_FILE_PATH):
        extracted_questions = analyze_pdf_and_parse(PDF_FILE_PATH)
        
        with open(FINAL_OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(extracted_questions, f, ensure_ascii=False, indent=2)
            
        print(f"\nSuccessfully extracted {len(extracted_questions)} questions.")
        print(f"Final structured JSON saved to: {FINAL_OUTPUT_PATH}")
    else:
        print(f"Error: PDF file not found at '{PDF_FILE_PATH}'. Please check the path.")
