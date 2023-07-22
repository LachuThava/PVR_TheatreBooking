// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiAqI8RS0QftdDZCRFu5cOgftc52AcbcQ",
  authDomain: "theatrebooking-73f1c.firebaseapp.com",
  projectId: "theatrebooking-73f1c",
  storageBucket: "theatrebooking-73f1c.appspot.com",
  messagingSenderId: "977529314802",
  appId: "1:977529314802:web:c5278bb97f43426267df6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export { app, auth, db };
