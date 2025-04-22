
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZsMxECLMd_R6MENO86huM8rOkz4CLn5Q",
  authDomain: "testing-ea5fd.firebaseapp.com",
  projectId: "testing-ea5fd",
  storageBucket: "testing-ea5fd.appspot.com", // Corrected from .firebasestorage.app to .appspot.com
  messagingSenderId: "52885553696",
  appId: "1:52885553696:web:3eb6ec05c664075216f245"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
