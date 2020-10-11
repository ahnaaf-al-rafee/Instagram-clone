import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0xR5dAaJk4Zqw_epbnOpWRNVEQ8eQJvI",
  authDomain: "instagram-clone-app-2.firebaseapp.com",
  databaseURL: "https://instagram-clone-app-2.firebaseio.com",
  projectId: "instagram-clone-app-2",
  storageBucket: "instagram-clone-app-2.appspot.com",
  messagingSenderId: "583447800242",
  appId: "1:583447800242:web:6473fef97196c6d06d1cab",
  measurementId: "G-2CLKG0RFPY",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
