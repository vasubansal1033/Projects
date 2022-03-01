// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQkIdUqnknUPb7I-jQqw8u7tgx_V5VOsU",
    authDomain: "insta-reels-clone-fb81d.firebaseapp.com",
    projectId: "insta-reels-clone-fb81d",
    storageBucket: "insta-reels-clone-fb81d.appspot.com",
    messagingSenderId: "27512218011",
    appId: "1:27512218011:web:ace73d410ee978fce0013e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const storage = getStorage();
const db = getFirestore();
export { auth, storage, db };
export default app;