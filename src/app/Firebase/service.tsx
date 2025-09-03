import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

export const SignUpWithEmail = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw new Error(error.message || "Sign up failed");
  }
};

export const SignInWithEmail = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw new Error(error.message || "Sign in failed");
  }
};

// sign up with google
const googleProvider = new GoogleAuthProvider();
export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Google sign in failed");
  }
};
