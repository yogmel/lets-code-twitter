import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  query,
  onValue,
  orderByChild,
} from "firebase/database";

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
export const writeNewUser = (uid, username, email) => {
  set(ref(database, "users/" + uid), {
    username,
    email,
  });
};

export const writeNewTweet = async (message) => {
  const user = await getCurrentUser();
  const auth = getAuthUser();

  const newPostKey = push(child(ref(database), "tweets")).key;
  const date = new Date();

  set(ref(database, "tweets/" + newPostKey), {
    time: date.getTime(),
    message,
    date: {
      fullDate: date.toString(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },
    author: {
      uid: auth.uid,
      username: user.username,
    },
    usersFavorited: [],
    comments: [],
  });
};

// export const getAllTweetsOnce = async () => {
//   const databaseRef = ref(database);
//   const tweets = await get(child(databaseRef, "tweets"));
//   if (tweets.exists()) {
//     return tweets.val();
//   }

//   console.log("No data available");
//   return null;
// };

export const watchAllTweets = async (successCallback) => {
  const tweets = query(ref(database, "tweets"), orderByChild("time"));
  onValue(tweets, (snapshot) => {
    const data = snapshot.val();
    successCallback(data);
  });
};

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
