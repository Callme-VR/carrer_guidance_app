// js/firebase-config.js

// Import Firebase from CDN (make sure these scripts are in your HTML too)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6MyVyJcMQXYC59BLtM5sdjL-NUMPfUow",
  authDomain: "carrer-guidance-app-77cff.firebaseapp.com",
  projectId: "carrer-guidance-app-77cff",
  storageBucket: "carrer-guidance-app-77cff.firebasestorage.app",
  messagingSenderId: "277414201081",
  appId: "1:277414201081:web:1e99c497129f307ea4c428",
  measurementId: "G-5KTBH0F74K"
};
// Initialize Firebase (v8 style for easier use in plain JS)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
