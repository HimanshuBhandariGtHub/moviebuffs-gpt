// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk_XNlJaKGFtelihtiVmhm0wGahTdlPFc",
  authDomain: "moviebuffs-gpt.firebaseapp.com",
  projectId: "moviebuffs-gpt",
  storageBucket: "moviebuffs-gpt.firebasestorage.app",
  messagingSenderId: "1059724704051",
  appId: "1:1059724704051:web:4aa4cdb0184d1a3d2c2646",
  measurementId: "G-H1FQGCMXZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);