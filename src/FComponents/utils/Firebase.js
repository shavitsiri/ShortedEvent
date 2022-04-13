// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_4uhw9Yer0ENRAiyxEty6QUa-6TTL7ws",
  authDomain: "finalfirestore-cb3d9.firebaseapp.com",
  projectId: "finalfirestore-cb3d9",
  storageBucket: "finalfirestore-cb3d9.appspot.com",
  messagingSenderId: "895859387118",
  appId: "1:895859387118:web:592643a8ce4e9b8d32e1ff",
  measurementId: "G-3BHTVCF2CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;