import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgd59C4lnvRQEXnUI57g6jUiE_C6D7n5I",
    authDomain: "tippmetothemoon.firebaseapp.com",
    databaseURL: "https://tippmetothemoon-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tippmetothemoon",
    storageBucket: "tippmetothemoon.appspot.com",
    messagingSenderId: "790915747267",
    appId: "1:790915747267:web:24642344b7ba5cf0008176"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);