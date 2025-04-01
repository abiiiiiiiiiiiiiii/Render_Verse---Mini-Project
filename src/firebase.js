// firebase.js
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    setPersistence, 
    browserSessionPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyArcXymMtwJiwHNcpGGxE3-9GxEYKC8oB0",
    authDomain: "renderverse-37b27.firebaseapp.com",
    projectId: "renderverse-37b27",
    storageBucket: "renderverse-37b27.firebasestorage.app",
    messagingSenderId: "797751080616",
    appId: "1:797751080616:web:ae961759d7f3611000749d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

// ❌ Disable automatic login by setting session persistence to NONE
setPersistence(auth, browserSessionPersistence)
    .then(() => console.log("Session Persistence Set to None"))
    .catch((error) => console.error("Error setting persistence:", error));

export { auth, db }; // ✅ Export both auth and db
