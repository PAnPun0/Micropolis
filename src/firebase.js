// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDEK6ivyju7EVxXboAFLFB7WOekqTUur6E",
  authDomain: "mpit2024-d9872.firebaseapp.com",
  projectId: "mpit2024-d9872",
  storageBucket: "mpit2024-d9872.firebasestorage.app",
  messagingSenderId: "356163166264",
  appId: "1:356163166264:web:c4f9df87034ce46a36c6cd",
  measurementId: "G-0RFC144V89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);