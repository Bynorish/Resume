// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwkZT1rrl_TGYBwA4Dq4uVgEXGSuwBLwI",
  authDomain: "resumedb-f9b09.firebaseapp.com",
  projectId: "resumedb-f9b09",
  storageBucket: "resumedb-f9b09.appspot.com",
  messagingSenderId: "1080485889300",
  appId: "1:1080485889300:web:b2c61d2ab0055055c8ae01",
  measurementId: "G-2KQYRYJKK0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };