// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: 'studio-4344220659-aaabe',
  appId: '1:289181322651:web:ad263da300b04979d1253e',
  apiKey: 'AIzaSyCvSePFqRXPG_2GqeRXdBdf266OLyGt7Pw',
  authDomain: 'studio-4344220659-aaabe.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '289181322651',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
