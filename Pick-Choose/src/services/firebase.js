// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACxDUqBNgNU8EC1m81UEYB3emUEAw6fOU",
  authDomain: "pick-choose.firebaseapp.com",
  projectId: "pick-choose",
  storageBucket: "pick-choose.firebasestorage.app",
  messagingSenderId: "238288578159",
  appId: "1:238288578159:web:132b593d6383919876cf9a",
  measurementId: "G-88ZDF31GBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);