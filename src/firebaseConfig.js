
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(process.env.REACT_APP_API_KEY);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "type-pulse-89045.firebaseapp.com",
    projectId: "type-pulse-89045",
    storageBucket: "type-pulse-89045.firebasestorage.app",
    messagingSenderId: "783301933527",
    appId: "1:783301933527:web:c316a396358e56b796f392",
    measurementId: "G-1YRNKFL3H4"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  export {auth, db}
