// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJsROmMz_0KPqa4eoeksYw1StK0FDfHoI",
  authDomain: "fir-tutorial-2-b9dc8.firebaseapp.com",
  projectId: "fir-tutorial-2-b9dc8",
  storageBucket: "fir-tutorial-2-b9dc8.appspot.com",
  messagingSenderId: "1031919540971",
  appId: "1:1031919540971:web:60b42832ff85ea467cfcae",
  measurementId: "G-T7XLMEJ59S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);