import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbgJ4U_cC6WCX3UYY2K2B-X2rIseq2CG4",
  authDomain: "webcarros-d1d40.firebaseapp.com",
  projectId: "webcarros-d1d40",
  storageBucket: "webcarros-d1d40.appspot.com",
  messagingSenderId: "213302630858",
  appId: "1:213302630858:web:93266ae544bd3291261733"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }

