// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8if7inz0hjZYRznMRsh5ASVZ7e0_dwaE",
  authDomain: "vikraya-e1e62.firebaseapp.com",
  projectId: "vikraya-e1e62",
  storageBucket: "vikraya-e1e62.firebasestorage.app",
  messagingSenderId: "408676166379",
  appId: "1:408676166379:web:9bf0c0ef66cf9d2b46ecae",
  measurementId: "G-4P6LDQ3KH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);