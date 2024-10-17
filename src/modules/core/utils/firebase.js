// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCN-ln-iNyiw5_e3EA92P3FR68TdPy93Y4",
  authDomain: "captura-y-comparte.firebaseapp.com",
  projectId: "captura-y-comparte",
  storageBucket: "captura-y-comparte.appspot.com",
  messagingSenderId: "875407233473",
  appId: "1:875407233473:web:5aae9c797c3ce2ea6edf40",
  measurementId: "G-DH3VS84HRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default app;
