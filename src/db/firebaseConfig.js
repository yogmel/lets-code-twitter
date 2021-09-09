import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyC-5_NGtjRrwLw4KxGOLO04GGAwMGRQHrs",
  authDomain: "lets-code---react.firebaseapp.com",
  projectId: "lets-code---react",
  storageBucket: "lets-code---react.appspot.com",
  messagingSenderId: "665651747794",
  appId: "1:665651747794:web:cc7aad1a64bbfab686c60b",
});

/* Database functions */
const database = getDatabase();
export function writeNewUser(uid, username, email) {
  set(ref(database, "users/" + uid), {
    username,
    email,
  });
}

/* Authenticator functions */
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const getAuthUser = () => auth.currentUser;
export const getCurrentUser = async () => {
  const databaseRef = ref(getDatabase());
  const user = await get(child(databaseRef, `users/${auth.currentUser.uid}`));
  if (user.exists()) {
    return user.val();
  }

  console.log("No data available");
  return null;
};

export const signOut = (onSuccess) => {
  auth.signOut();
  onSuccess();
};

export const signInWithGoogle = (successCallback, errorCallback) => {
  signInWithPopup(auth, googleProvider)
    .then((userCredential) => {
      const user = userCredential.user;
      writeNewUser(user.uid, user.displayName, user.email);
      successCallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorCallback(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};

export const signUp = (
  username,
  email,
  password,
  successCallback,
  errorCallback
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      writeNewUser(user.uid, username, user.email);
      successCallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorCallback(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};

export const loginWithEmailAndPassword = (
  email,
  password,
  successCallback,
  errorCallback
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user", user);
      successCallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorCallback(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};
