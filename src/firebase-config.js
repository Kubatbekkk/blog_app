// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAELI-laMPUSBUcfIyUp0ldN2zVixVz77Q",
  authDomain: "blog-app-19640.firebaseapp.com",
  projectId: "blog-app-19640",
  storageBucket: "blog-app-19640.appspot.com",
  messagingSenderId: "256961723538",
  appId: "1:256961723538:web:b53122a927a7ea77267a4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();