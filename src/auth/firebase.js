import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT1eiVDL7FB1Lvu0JLZrASXAO37joivTU",
  authDomain: "trinity-60873.firebaseapp.com",
  projectId: "trinity-60873",
  storageBucket: "trinity-60873.appspot.com", 
  messagingSenderId: "388631975888",
  appId: "1:388631975888:web:c684e30fff81eaa2fc4bd5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
