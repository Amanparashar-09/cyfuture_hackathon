import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB5Btwdomn8VLL98vJJPTE5w68AfWnUOg",
  authDomain: "cyfutureai-5ce93.firebaseapp.com",
  projectId: "cyfutureai-5ce93",
  storageBucket: "cyfutureai-5ce93.appspot.com",
  messagingSenderId: "697882872174",
  appId: "1:697882872174:web:5f1c9c35593646ff75997f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 