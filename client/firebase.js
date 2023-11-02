// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d47b2.firebaseapp.com",
  projectId: "mern-estate-d47b2",
  storageBucket: "mern-estate-d47b2.appspot.com",
  messagingSenderId: "840109673945",
  appId: "1:840109673945:web:9412e9da590889ab401dc8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);