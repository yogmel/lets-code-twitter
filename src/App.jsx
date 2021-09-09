import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { PrivateRoute, Tweets } from "./routes";
import { tweets, users } from "./data";
import { LoginContainer as Login } from "./routes/Login";

function App() {
  const idUsuarioLogado = 0;

  const tweetsDataFormatada = tweets.map((tweet) => {
    const dataFormatada = `${
      tweet.date.getDate() + 1
    }/${tweet.date.getMonth()}/${tweet.date.getFullYear()}`;
    return {
      ...tweet,
      date: dataFormatada,
    };
  });

  const tweetsComAutor = tweetsDataFormatada.map((tweet) => {
    const user = users.find((user) => {
      return tweet.author === user.id;
    });

    return {
      ...tweet,
      author: user,
    };
  });

  const tweetsMeuPerfil = tweetsComAutor.filter((tweet) => {
    return idUsuarioLogado === tweet.author.id;
  });

  return (
    <div className="App">
      <PrivateRoute path="/geral">
        <Tweets tweets={tweetsMeuPerfil} />
      </PrivateRoute>

      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
}

export default App;
