// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: "AIzaSyCF_lNdA3wfz8TVQzs_uDiyGal0zLEteTA",
  authDomain: "restapi-6861f.firebaseapp.com",
  projectId: "restapi-6861f",
  storageBucket: "restapi-6861f.appspot.com",
  messagingSenderId: "685629321774",
  appId: "1:685629321774:web:bbb00ba6c324fb1917a5bf",
  measurementId: "G-SDNV1CQXGX"
});

// Initialize Firebase

export const auth = app.auth();
export const database = app.database();
export default app;