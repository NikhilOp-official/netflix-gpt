// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN7fv_G-riaYf0Y7M4a75Y16um75D3ZvY",
  authDomain: "netflix-gpt-59f45.firebaseapp.com",
  projectId: "netflix-gpt-59f45",
  storageBucket: "netflix-gpt-59f45.appspot.com",
  messagingSenderId: "429862589077",
  appId: "1:429862589077:web:cbd4102b4b1a471818019c",
  measurementId: "G-BSETHKZE9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();
