import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FB_API_KEY,
  // authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FB_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  // appId: process.env.REACT_APP_FB_APP_ID,
  // measurementId: process.env.REACT_APP_FB_MEASURE_ID,

  apiKey: "AIzaSyBejz2gD3xv6Y5W8SMIUsbCXqfCTHE1_y4",
  authDomain: "couplecalendar-61035.firebaseapp.com",
  projectId: "couplecalendar-61035",
  storageBucket: "couplecalendar-61035.appspot.com",
  messagingSenderId: "625403356365",
  appId: "1:625403356365:web:61731751c7762239943584",
  measurementId: "G-NQX0WWN4Q5",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
