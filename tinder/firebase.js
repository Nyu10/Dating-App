// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhp8f5ceBtVavfgWp_OcT3UNO4HWN86lk",
  authDomain: "dating-app-84217.firebaseapp.com",
  projectId: "dating-app-84217",
  storageBucket: "dating-app-84217.appspot.com",
  messagingSenderId: "488464302281",
  appId: "1:488464302281:web:08dd10c8df456c5c25cd18",
  measurementId: "G-4BWGBC9NS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export {auth, db}