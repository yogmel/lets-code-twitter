import { Route, Redirect } from "react-router-dom";
import { LoginContainer as Login } from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Tweets } from "./Tweets";
import { useCallback, useState, useEffect } from "react";
import { watchAllTweets } from "./../db/firebaseConfig";
import { CurrentUserContext, TweetsContext } from "./../context";

function Routes() {
  const [tweets, setTweets] = useState([]);
  // const [user, setUser] = useState(null);

  const storeTweets = (tweetsObj) => {
    const tweets = [];
    for (const prop in tweetsObj) {
      tweets.unshift(tweetsObj[prop]);
    }
    setTweets(tweets);
  };

  const fetchTweets = useCallback(async () => {
    watchAllTweets(storeTweets);
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <TweetsContext.Provider value={tweets}>
      <CurrentUserContext.Provider value={null}>
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
      </CurrentUserContext.Provider>
    </TweetsContext.Provider>
  );
}

export default Routes;
