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


// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAlztMMVXKXA5oSVpwe0XthJ6TWNe31BSo",
//   authDomain: "fir-course-beba9.firebaseapp.com",
//   projectId: "fir-course-beba9",
//   storageBucket: "fir-course-beba9.appspot.com",
//   messagingSenderId: "236316955671",
//   appId: "1:236316955671:web:2b18d92e1b6644fae3f852",
//   measurementId: "G-HENJ7D82KH",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// export const db = getFirestore(app);
// export const storage = getStorage(app);