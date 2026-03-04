// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxdmelSfv6-qcDUxpizPVOWKJiRkdcmio",
  authDomain: "projecttracker-2f6eb.firebaseapp.com",
  databaseURL: "https://projecttracker-2f6eb-default-rtdb.firebaseio.com",
  projectId: "projecttracker-2f6eb",
  storageBucket: "projecttracker-2f6eb.firebasestorage.app",
  messagingSenderId: "1015346103233",
  appId: "1:1015346103233:web:7d7e64895dc5739cbaa540"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
