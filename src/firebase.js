// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3JAQ6IdIBqaXKfZcKUXzOZfMyM5rCI8s",
  authDomain: "giggles-31046.firebaseapp.com",
  projectId: "giggles-31046",
  storageBucket: "giggles-31046.appspot.com",
  messagingSenderId: "600517635735",
  appId: "1:600517635735:web:784efb25d8b25e085603d2",
  measurementId: "G-DXXJRHE642"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
