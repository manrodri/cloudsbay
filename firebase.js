import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfMGS4bzZ4TT__w2LHax8DEW0B9q6bVJQ",
    authDomain: "ecommerce-5eb9c.firebaseapp.com",
    projectId: "ecommerce-5eb9c",
    storageBucket: "ecommerce-5eb9c.appspot.com",
    messagingSenderId: "528890881482",
    appId: "1:528890881482:web:8022fceeaf9bce5d2adb33",
    measurementId: "G-N1154QSE7S"
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();