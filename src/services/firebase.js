// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAhMuIErTjJ9jivwLaO00vPGuaIel6jN00",
  authDomain: "cloningnotion.firebaseapp.com",
  projectId: "cloningnotion",
  storageBucket: "cloningnotion.appspot.com",
  messagingSenderId: "556551371701",
  appId: "1:556551371701:web:f8fe943de4248e8125f7fc",
  measurementId: "G-YT1V2XVM4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };
// const analytics = getAnalytics(app);
