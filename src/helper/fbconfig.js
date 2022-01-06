// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDf52Gv_P6mUVAMPpYUa_6TbccAtJEhJwM",
  authDomain: "first-34f4e.firebaseapp.com",
  projectId: "first-34f4e",
  storageBucket: "first-34f4e.appspot.com",
  messagingSenderId: "757773820752",
  appId: "1:757773820752:web:5efb74a2d9d95389d68255",
  measurementId: "G-7Q2VM2EB08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
