import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseUrl: process.env.REACT_APP_DB_URL,
};
firebase.initializeApp(config);
// firebase.auth().settings.appVerificationDisabledForTesting = false;
// firebase.auth().settings.isAppVerificationDisabledForTesting = true;

export default firebase;
