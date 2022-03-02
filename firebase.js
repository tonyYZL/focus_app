import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBef2n1R4nUWgw66yY-8Fmd_UdJFehAlM",
  authDomain: "focus-93093.firebaseapp.com",
  projectId: "focus-93093",
  storageBucket: "focus-93093.appspot.com",
  messagingSenderId: "371184297409",
  appId: "1:371184297409:web:209d45e42da8772f327b40",
  measurementId: "G-S020R3FKV8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
