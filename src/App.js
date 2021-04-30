import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import { LoggedUser, Login, PrivateRoute, TweetContainer } from "./components";
import { tweets, users } from "./data";

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
      <LoggedUser users={users} idUsuarioLogado={idUsuarioLogado} />

      <div className="tweets-tabs">
        <ul>
          <li>
            <Link to="/geral">Geral</Link>
          </li>
          <li>
            <Link to="/meu-perfil">Meu Perfil</Link>
          </li>
          <li>
            <Link to="/meus-favoritos">Favoritos</Link>
          </li>
        </ul>

        <PrivateRoute path="/geral" role="admin">
          {tweetsComAutor.map((tweet) => (
            <TweetContainer key={tweet.id} tweet={tweet} />
          ))}
        </PrivateRoute>

        <PrivateRoute path="/meu-perfil" role="user">
          {tweetsMeuPerfil.map((tweet) => (
            <TweetContainer key={tweet.id} tweet={tweet} />
          ))}
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
      </div>
    </div>
  );
}

export default App;
