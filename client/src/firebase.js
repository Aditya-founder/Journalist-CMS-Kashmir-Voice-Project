// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "portfolio-blog-cb036.firebaseapp.com",
  projectId: "portfolio-blog-cb036",
  storageBucket: "portfolio-blog-cb036.firebasestorage.app",
  messagingSenderId: "398391644947",
  appId: "1:398391644947:web:f77c60b24853e3ad34c0e6",
  measurementId: "G-FHCRMXZQHJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


