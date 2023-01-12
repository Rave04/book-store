import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQab8IVC-4Q3_8unaMMFXwBq85CHXpTDI",
  authDomain: "react-bookstore-6ac6e.firebaseapp.com",
  databaseURL: "https://react-bookstore-6ac6e-default-rtdb.firebaseio.com",
  projectId: "react-bookstore-6ac6e",
  storageBucket: "react-bookstore-6ac6e.appspot.com",
  messagingSenderId: "29222025032",
  appId: "1:29222025032:web:ee3a850568f5bc6b52a57d",
  measurementId: "G-M01C6V35ZS",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = getAuth(app);
export default storage;
