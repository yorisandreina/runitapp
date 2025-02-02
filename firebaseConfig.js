// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo4u2sR5Mb8u2RmE3umoUy_TZerWWsU2Y",
  authDomain: "runit-8e5c8.firebaseapp.com",
  databaseURL: "https://runit-8e5c8-default-rtdb.firebaseio.com",
  projectId: "runit-8e5c8",
  storageBucket: "runit-8e5c8.appspot.com",
  messagingSenderId: "765856848914",
  appId: "1:765856848914:web:019dd229bf264d51ce0ccb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
export const auth = getAuth(app);