import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBIlQrESjTHFLbU21i4NFtNX8Zm1y78rAY",
  authDomain: "lmsystem-8c695.firebaseapp.com",
  projectId: "lmsystem-8c695",
  storageBucket: "lmsystem-8c695.firebasestorage.app",
  messagingSenderId: "349345972682",
  appId: "1:349345972682:web:4acb1fe695fa0243bfcf33",
  measurementId: "G-9P7TV4G8M8",
};

// Prevent multiple initializations (Next.js hot reload issue fix)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const auth = getAuth(app);
