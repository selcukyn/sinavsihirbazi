import json

def update_questions_with_correct_answers():
    """
    Reads the solution cache and the questions JSON, adds the correctOptionId
    to the questions, and updates the questions_from_pdf.json file.
    """
    try:
        with open('src/lib/solution-cache.json', 'r', encoding='utf-8') as f:
            solution_cache = json.load(f)

        with open('src/lib/questions_from_pdf.json', 'r', encoding='utf-8') as f:
            questions_data = json.load(f)

        updated_questions = []
        for question in questions_data:
            question_id = f"ales-{question['questionNumber']}"
            if question_id in solution_cache:
                solution_text = solution_cache[question_id]
                # Find the correct answer in the first line of the solution
                first_line = solution_text.split('\n')[0]
                # Regex to find "Doğru Cevap: **X**"
                import re
                match = re.search(r'Doğru Cevap: \*\*([A-E])\*\*', first_line, re.IGNORECASE)
                if match:
                    correct_option = match.group(1).lower()
                    question['correctOptionId'] = correct_option
            updated_questions.append(question)

        with open('src/lib/questions_from_pdf.json', 'w', encoding='utf-8') as f:
            json.dump(updated_questions, f, ensure_ascii=False, indent=2)

        print("Successfully updated questions_from_pdf.json with correct answers.")

    except FileNotFoundError as e:
        print(f"Error: {e}. Make sure the file paths are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    update_questions_with_correct_answers()
