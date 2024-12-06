import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-config.json";

const app = initializeApp(firebaseConfig as FirebaseOptions);
export const auth = getAuth(app);
export const db = getFirestore(app);
