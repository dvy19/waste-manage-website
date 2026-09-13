// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQCy635foAsVEGflkwDCFc4rKPQ_Z7htY",
  authDomain: "waste-manager-web.firebaseapp.com",
  projectId: "waste-manager-web",
  storageBucket: "waste-manager-web.firebasestorage.app",
  messagingSenderId: "612359595058",
  appId: "1:612359595058:web:c8d3759295ae062553082b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);