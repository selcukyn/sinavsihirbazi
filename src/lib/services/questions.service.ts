import { db } from '@/lib/firebase';
import type { Question, Subject } from '@/lib/types';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
  setDoc,
} from 'firebase/firestore';

const questionsCollectionRef = collection(db, 'questions');

// Helper function to safely serialize Firestore data
const serializeData = (doc: any) => {
  const data = doc.data();
  // A simple way to convert non-serializable fields like Timestamps
  const safeData = JSON.parse(JSON.stringify(data));
  return {
    id: doc.id,
    ...safeData,
  } as Question;
};

// Fetch all questions from Firestore
export const getQuestions = async (): Promise<Question[]> => {
  try {
    const q = query(questionsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(serializeData);
    return questions;
  } catch (error) {
    console.error("Error fetching questions, returning empty array:", error);
    // This can happen if the collection doesn't exist yet
    return [];
  }
};

// Add a new question to Firestore with a sequential ID
export const addQuestion = async (
  question: Omit<Question, 'id'>
): Promise<string> => {
  const subjectPrefixMap: Record<Subject, string> = {
    mathematics: 'mat',
    turkish: 'tur',
    ales: 'ales',
  };
  const prefix = subjectPrefixMap[question.subject];

  // 1. Get all questions for the given subject
  const q = query(questionsCollectionRef, where('subject', '==', question.subject));
  const querySnapshot = await getDocs(q);
  
  // 2. Find the highest number in the IDs
  let maxId = 0;
  querySnapshot.docs.forEach(doc => {
    const id = doc.id;
    if (id.startsWith(prefix)) {
      const numPart = parseInt(id.split('-')[1], 10);
      if (!isNaN(numPart) && numPart > maxId) {
        maxId = numPart;
      }
    }
  });

  // 3. Create the new sequential ID
  const newId = `${prefix}-${maxId + 1}`;

  // 4. Add the document with the custom ID
  const newQuestionDocRef = doc(db, 'questions', newId);
  await setDoc(newQuestionDocRef, {
    ...question,
    answer: '', // Initialize with an empty answer field
    createdAt: serverTimestamp(),
  });
  
  return newId;
};

// Update an existing question in Firestore
export const updateQuestion = async (
  id: string,
  question: Partial<Question>
): Promise<void> => {
  const questionDoc = doc(db, 'questions', id);
  // Prevent overwriting timestamp on update
  const { createdAt, ...updateData } = question;
  await updateDoc(questionDoc, updateData);
};

// Delete a question from Firestore
export const deleteQuestion = async (id: string): Promise<void> => {
  const questionDoc = doc(db, 'questions', id);
  await deleteDoc(questionDoc);
};
