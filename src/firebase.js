// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "practice-auth-5fd08.firebaseapp.com",
	projectId: "practice-auth-5fd08",
	storageBucket: "practice-auth-5fd08.appspot.com",
	messagingSenderId: "552667240546",
	appId: "1:552667240546:web:53215ea280d80098f2193b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
