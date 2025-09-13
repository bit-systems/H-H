import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./firebase-config";

let app = null;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}
const auth = getAuth(app);
let db: Firestore;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // optional for localhost/VPN
  });
} catch (e) {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { auth, db, storage };
