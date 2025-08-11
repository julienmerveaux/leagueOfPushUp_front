// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0qVxioqeLK79wxEso_BnSm2Cr33faZqM",
    authDomain: "leagueofpushup.firebaseapp.com",
    projectId: "leagueofpushup",
    storageBucket: "leagueofpushup.firebasestorage.app",
    messagingSenderId: "477039548213",
    appId: "1:477039548213:web:647d2e86f5581cfe709e7c",
    measurementId: "G-1YK1Q0DJX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export { db, auth };