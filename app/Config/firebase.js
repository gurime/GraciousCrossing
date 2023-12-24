// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyDh0Tj8-_-Apyt8Bbl_v0gVDfIoatwp4eE",
  authDomain: "gracious-crossing.firebaseapp.com",
  projectId: "gracious-crossing",
  storageBucket: "gracious-crossing.appspot.com",
  messagingSenderId: "641405250070",
  appId: "1:641405250070:web:2d99b467a73e6c1703e337"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };