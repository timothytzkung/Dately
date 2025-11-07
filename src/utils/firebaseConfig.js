// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAm5EZJT-Yt6mphM0eDaL295GMf8k4Vs0",
  authDomain: "dately-a4fc3.firebaseapp.com",
  projectId: "dately-a4fc3",
  storageBucket: "dately-a4fc3.firebasestorage.app",
  messagingSenderId: "567327186397",
  appId: "1:567327186397:web:b031d10d09ae91b3d8ea34",
  measurementId: "G-G2LMYEN54X"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebase_auth = getAuth(app);
export const db = getFirestore(app);