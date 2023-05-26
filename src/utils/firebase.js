import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAugHDD318l6Ro1AUWNyU7xllmkEPEBrS8",
  authDomain: "rncrud-2d9e3.firebaseapp.com",
  projectId: "rncrud-2d9e3",
  storageBucket: "rncrud-2d9e3.appspot.com",
  messagingSenderId: "1016080484295",
  appId: "1:1016080484295:web:da63484a30b05a029e3be2",
  measurementId: "G-HPP928FH71"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
