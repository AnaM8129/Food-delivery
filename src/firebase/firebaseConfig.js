// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8bwC-38cNklUdkLAkArinQUsTNuWWh-M",
  authDomain: "to-do-list-e04f6.firebaseapp.com",
  projectId: "to-do-list-e04f6",
  storageBucket: "to-do-list-e04f6.appspot.com",
  messagingSenderId: "967249382524",
  appId: "1:967249382524:web:64afe7693a90fe9a9a4df9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
