import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ4gCPoZRHg-LpiB2n_qoUzsXH9j4fUTw",
  authDomain: "projectone-32958.firebaseapp.com",
  projectId: "projectone-32958",
  storageBucket: "projectone-32958.appspot.com",
  messagingSenderId: "363919468778",
  appId: "1:363919468778:web:15acb8f6b8697de7050f93",
  measurementId: "G-KQ6ZS7VDDT"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

