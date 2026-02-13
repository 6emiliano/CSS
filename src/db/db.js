// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIwpfH2PpNzik-xS9F55PioqyedNHloTA",
  authDomain: "dds-6-e305d.firebaseapp.com",
  projectId: "dds-6-e305d",
  storageBucket: "dds-6-e305d.firebasestorage.app",
  messagingSenderId: "308604994670",
  appId: "1:308604994670:web:5dfa5d0d963a34546b127f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;