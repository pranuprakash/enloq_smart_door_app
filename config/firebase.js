// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAsGdOlj_XKNeRtK4z9PAWW4cXLryhatvI",
//   authDomain: "smartdoor-e9a79.firebaseapp.com",
//   projectId: "smartdoor-e9a79",
//   storageBucket: "smartdoor-e9a79.appspot.com",
//   messagingSenderId: "586753193643",
//   appId: "1:586753193643:web:846787524c80e59a93a9ee",
//   measurementId: "G-CW2LHQVMWP"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAvBa31vsjTQ8ZZsb4PVk1Oc4DHPreDKhk",
  authDomain: "enloq-app.firebaseapp.com",
  projectId: "enloq-app",
  storageBucket: "enloq-app.appspot.com",
  messagingSenderId: "981962979280",
  appId: "1:981962979280:web:3ce28e98863707e1852bd5",
  measurementId: "G-7PZQVTSCNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase()
export const dbFS = getFirestore();
export const auth = getAuth(app)
export const storage = getStorage(app);

