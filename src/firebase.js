import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBejz2gD3xv6Y5W8SMIUsbCXqfCTHE1_y4",
  authDomain: "couplecalendar-61035.firebaseapp.com",
  projectId: "couplecalendar-61035",
  storageBucket: "couplecalendar-61035.appspot.com",
  messagingSenderId: "625403356365",
  appId: "1:625403356365:web:61731751c7762239943584",
  measurementId: "G-NQX0WWN4Q5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
