import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
export function writeUserData(username, email) {
  set(ref(database, "users/" + username), {
    username,
    email,
  });
}

/* Authenticator functions */
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      localStorage.setItem("user", JSON.stringify(result.user));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};

export const signUp = (username, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      writeUserData(username, user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};
