// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6ac7b.firebaseapp.com",
  projectId: "mern-blog-6ac7b",
  storageBucket: "mern-blog-6ac7b.appspot.com",
  messagingSenderId: "569009783618",
  appId: "1:569009783618:web:44d358759be86be0a27edb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
