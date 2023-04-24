// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export default firebase;