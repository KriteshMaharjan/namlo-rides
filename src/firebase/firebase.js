// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZPxBCs7L3cFG7l4E0OW6iEw-GLL-8kao",
  authDomain: "namlo-rides-4c9ed.firebaseapp.com",
  databaseURL: "https://namlo-rides-4c9ed-default-rtdb.firebaseio.com",
  projectId: "namlo-rides-4c9ed",
  storageBucket: "namlo-rides-4c9ed.firebasestorage.app",
  messagingSenderId: "831397601079",
  appId: "1:831397601079:web:3a6e839981420ede8d04b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
