import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const config = {
  apiKey: "AIzaSyAWpBjvHCZlygWndoe7GrxL2TjmHT8rYK0",
  authDomain: "grocery-e-commerce-web-app.firebaseapp.com",
  projectId: "grocery-e-commerce-web-app",
  storageBucket: "grocery-e-commerce-web-app.appspot.com",
  messagingSenderId: "991938908841",
  appId: "1:991938908841:web:e2f27ba3319fc352890fb8",
  measurementId: "G-71WLE64Y5M",
};

firebase.initializeApp(config);
const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default db;
