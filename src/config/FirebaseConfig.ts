// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy88Bq7unJ9UY2Cl6GTZ8ev0WmgPy66Ec",
  authDomain: "taskmanagement-79ba9.firebaseapp.com",
  projectId: "taskmanagement-79ba9",
  storageBucket: "taskmanagement-79ba9.firebasestorage.app",
  messagingSenderId: "52490374939",
  appId: "1:52490374939:web:079a2209007905924a0dbe",
  measurementId: "G-PFJ4Q3K4LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance

