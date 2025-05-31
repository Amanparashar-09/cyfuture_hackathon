import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXs0XgclTgzCv8QFQhLvbwuv6mVl1Xqy0",
  authDomain: "cyfuture-d3b93.firebaseapp.com",
  projectId: "cyfuture-d3b93",
  storageBucket: "cyfuture-d3b93.firebasestorage.app",
  messagingSenderId: "110780104871",
  appId: "1:110780104871:web:3893ce5caf140928111b82",
  measurementId: "G-1ZDL0CTXT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
