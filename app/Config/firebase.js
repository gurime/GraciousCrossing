// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyCZlO-JkjUCRv8P6vfnGjTUqT76xdhbU4o",
  authDomain: "graciouscrossing-5fcf0.firebaseapp.com",
  projectId: "graciouscrossing-5fcf0",
  storageBucket: "graciouscrossing-5fcf0.appspot.com",
  messagingSenderId: "622054581133",
  appId: "1:622054581133:web:e081932c03da35223e93c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };