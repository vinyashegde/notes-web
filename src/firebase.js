// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2T4M0uPgRW8WWW_n1lTDpy8kGNMiAFq0",
  authDomain: "notebook-7a7e4.firebaseapp.com",
  projectId: "notebook-7a7e4",
  storageBucket: "notebook-7a7e4.appspot.com",
  messagingSenderId: "731076669459",
  appId: "1:731076669459:web:65f75e87abb4e561164fe6",
  measurementId: "G-CDQNG39TPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
