// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZvvvZJ6uPvYmtO2h4FcyoW0TGIWauc6o",
  authDomain: "fir-auth-example-d4e79.firebaseapp.com",
  projectId: "fir-auth-example-d4e79",
  storageBucket: "fir-auth-example-d4e79.appspot.com",
  messagingSenderId: "538668208169",
  appId: "1:538668208169:web:cf693226bb705cedd94c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
