// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8dLRx_bKzzznicqht58k0yMaVndapAcY",
  authDomain: "mernchat-shawon.firebaseapp.com",
  projectId: "mernchat-shawon",
  storageBucket: "mernchat-shawon.firebasestorage.app",
  messagingSenderId: "384018612178",
  appId: "1:384018612178:web:5cd33ec2bf616f5fe6520b",
  measurementId: "G-VT6QPF33XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
