import { Route, Redirect } from "react-router-dom";
import { LoginContainer as Login } from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Tweets } from "./Tweets";
import { useState, useEffect } from "react";
import { watchAllTweets } from "./../db/firebaseConfig";
import { TweetsContext } from "./../context";

function Routes() {
  const [tweets, setTweets] = useState([]);

  const storeTweets = (tweetsObj) => {
    const tweets = [];
    for (const prop in tweetsObj) {
      tweets.unshift(tweetsObj[prop]);
    }
    setTweets(tweets);
  };

  const fetchTweets = async () => {
    watchAllTweets(storeTweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <TweetsContext.Provider value={tweets}>
      <PrivateRoute path="/geral">
        <Tweets visibility="all" />
      </PrivateRoute>

      <PrivateRoute path="/meu-perfil">
        <Tweets visibility="currentUser" />
      </PrivateRoute>

      <PrivateRoute path="/meus-favoritos">
        <Tweets visibility="currentUserFaves" />
      </PrivateRoute>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
    </TweetsContext.Provider>
  );
}

export default Routes;
