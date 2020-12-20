import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
    {
    apiKey: "AIzaSyB6xxV5qALhP5w5QFa93naaUFIqafgk7ms",
    authDomain: "instagram-clone-react-12874.firebaseapp.com",
    projectId: "instagram-clone-react-12874",
    storageBucket: "instagram-clone-react-12874.appspot.com",
    messagingSenderId: "765054516199",
    appId: "1:765054516199:web:6f3c6105ae7cc190a71b42",
    measurementId: "G-K7G41Z8Q67"

    }
);


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};