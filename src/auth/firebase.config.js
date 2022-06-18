import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBqF67SfhdOL8cCY-RGfT-z-Lwq8UYu4C0",
    authDomain: "e-shop-65f5e.firebaseapp.com",
    projectId: "e-shop-65f5e",
    storageBucket: "e-shop-65f5e.appspot.com",
    messagingSenderId: "529322482389",
    appId: "1:529322482389:web:d2b8af37c3e2631fcf205c"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);