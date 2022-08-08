// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqJ6leWRlCRR5Zf5H2DEVAk9I1YBWZkAo",
  authDomain: "tinder-clone-yt-14aca.firebaseapp.com",
  projectId: "tinder-clone-yt-14aca",
  storageBucket: "tinder-clone-yt-14aca.appspot.com",
  messagingSenderId: "122649946680",
  appId: "1:122649946680:web:2e5b0bb3f8617303fad4cd",
  measurementId: "G-EZRVBQPTED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

export {auth, db}