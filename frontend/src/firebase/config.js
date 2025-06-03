import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAB5Btwdomn8VLL98vJJPTE5w68AfWnUOg",
  authDomain: "cyfutureai-5ce93.firebaseapp.com",
  projectId: "cyfutureai-5ce93",
  storageBucket: "cyfutureai-5ce93.appspot.com",
  messagingSenderId: "697882872174",
  appId: "1:697882872174:web:5f1c9c35593646ff75997f"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
