// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIlQrESjTHFLbU21i4NFtNX8Zm1y78rAY",
  authDomain: "lmsystem-8c695.firebaseapp.com",
  projectId: "lmsystem-8c695",
  storageBucket: "lmsystem-8c695.firebasestorage.app",
  messagingSenderId: "349345972682",
  appId: "1:349345972682:web:4acb1fe695fa0243bfcf33",
  measurementId: "G-9P7TV4G8M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);