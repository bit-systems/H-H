import  {initializeApp, getApps, setLogLevel} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, doc , getDoc, enableNetwork, connectFirestoreEmulator} from 'firebase/firestore';
import { getStorage , } from 'firebase/storage';

import { firebaseConfig } from './firebase-config.ts';



let app = null
if (!getApps().length) {
app =   initializeApp(firebaseConfig, {useFetchStreams: false, automaticDataCollectionEnabled: true, });
}else {
app =   getApps()[0]; // if already initialized, use that one
}
const auth = getAuth(app);
let db;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // optional for localhost/VPN
    merge: true
  });
} catch (e) {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { auth, db, storage };
