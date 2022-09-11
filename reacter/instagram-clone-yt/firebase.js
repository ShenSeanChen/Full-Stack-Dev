// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeykfFFTJCXvbLBPnnKLC_Nnasy6MBoOc",
  authDomain: "instagram-clone-yt-c3046.firebaseapp.com",
  projectId: "instagram-clone-yt-c3046",
  storageBucket: "instagram-clone-yt-c3046.appspot.com",
  messagingSenderId: "616747167343",
  appId: "1:616747167343:web:aa5f5bb655fa5c5874e79a",
  measurementId: "G-K3LGTJEWEF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

// Prepare DB
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };