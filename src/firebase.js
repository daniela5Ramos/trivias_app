// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDTR2uPU3EQJyuTEBApIZJxZULBjbKK09k",
  authDomain: "test-push-cc9bd.firebaseapp.com",
  projectId: "test-push-cc9bd",
  storageBucket: "test-push-cc9bd.firebasestorage.app",
  messagingSenderId: "859424279036",
  appId: "1:859424279036:web:e50ff0876eecce12cb0a79",
  measurementId: "G-EFCWZQJZ3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
