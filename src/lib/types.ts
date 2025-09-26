export type Subject = 'mathematics' | 'turkish' | 'ales';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id:string;
  subject: Subject;
  question: string;
  options: Option[];
  correctOptionId: string | undefined; // Can be undefined if not available
  answer?: string; // For ALES questions
  imageUrl?: string;
  text?: string; // backwards compatibility
  questionNumber?: number; // For ALES questions
  createdAt?: any; // To accommodate serialized timestamp
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  questionText: string;
}

// Type for the raw data from questions_from_pdf.json
export interface RawAlesQuestion {
    id?: number; // This was a sequential id, can be removed.
    questionNumber: number;
    questionText: string;
    options: { [key: string]: string };
    sourcePage: string;
    correctOptionId?: string;
}

// User and session types
export type UserRole = 'admin' | 'ogrenci';
export type UserStatus = 'active' | 'passive';

export interface User {
    id?: string;
    username: string;
    password?: string; // Should be hashed
    role: UserRole;
    status: UserStatus;
}

export interface SessionPayload {
    userId: string;
    username: string;
    role: UserRole;
    expiresAt: Date;
}
