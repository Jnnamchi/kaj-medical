// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import firebase from "firebase";
import "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBenwNwca47RXSRA1jJ9v4CGPd6hRpgRx8",
  authDomain: "kaj-medical-d900b.firebaseapp.com",
  projectId: "kaj-medical-d900b",
  storageBucket: "kaj-medical-d900b.appspot.com",
  messagingSenderId: "786702782860",
  appId: "1:786702782860:web:d0be700db41022a06cc6a9",
  measurementId: "G-FLLF6C2BY3",
};

// Initialize Firebase
// Initialize and export Firebase
firebase.initializeApp(firebaseConfig)
export const firebasePackage = firebase

// Exported Functions
export function userIsLoggedIn () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return true
  }
  return false
}

export function getCurrentUser() {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return {
      "name": currentUser.displayName,
      "uuid": currentUser.uid,
    };
  }
}

export function getCurrentUserId () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.uid
  }
  return "vANGKub2xBNrryjP3aYMix6jZ6n1"
}

export function getCurrentUserName () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.displayName
  }
  return null
}

export function getCurrentUserEmail () {
    const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.email
  }
  return null
}

export function logoutFirebase () {
  firebase.auth().signOut().then(() => {
    console.log("Logged Out")
  })
}

export function getUserLoggedIn () {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
}