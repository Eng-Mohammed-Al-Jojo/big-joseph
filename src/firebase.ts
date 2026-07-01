/*----*/

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGrqtcBL2zjc7YZk_jrNOJo-tD4MhwQX8",
    authDomain: "big-joseph.firebaseapp.com",
    databaseURL: "https://big-joseph-default-rtdb.firebaseio.com",
    projectId: "big-joseph",
    storageBucket: "big-joseph.firebasestorage.app",
    messagingSenderId: "4543150113",
    appId: "1:4543150113:web:1ec2a8b16bd9b489450b60"
};
const app = initializeApp(firebaseConfig);

// 👇 هذا هو المهم
export const db = getDatabase(app);
export const auth = getAuth(app);
