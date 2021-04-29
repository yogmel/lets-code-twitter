import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { TweetContainer, LoggedUser } from "./components";
import { Route, Link } from 'react-router-dom';

import { tweets, users } from "./data";

function App() {
  const idUsuarioLogado = 0;

  const tweetsDataFormatada = tweets.map((tweet) => {
    const dataFormatada = `${tweet.date.getDate() + 1}/${tweet.date.getMonth()}/${tweet.date.getFullYear()}`;
    return {
      ...tweet,
      date: dataFormatada
    };
  });

  const tweetsComAutor = tweetsDataFormatada.map((tweet) => {
    const user = users.find((user) => {
      return tweet.author === user.id;
    });

    return {
      ...tweet,
      author: user
    };
  });

  const tweetsMeuPerfil = tweetsComAutor.filter((tweet) => {
    return idUsuarioLogado === tweet.author.id;
  });

  return (
    <div className="App">
      <LoggedUser
        users={users}
        idUsuarioLogado={idUsuarioLogado}
      />

      <div className="tweets-tabs">
        <ul>
          <li><Link to="/geral">Geral</Link></li>
          <li><Link to="/meu-perfil">Meu Perfil</Link></li>
          <li><Link to="/meus-favoritos">Favoritos</Link></li>
        </ul>

        <Route path="/geral">
          {tweetsComAutor.map((tweet) => <TweetContainer key={tweet.id} tweet={tweet} />)}
        </Route>

        <Route path="/meu-perfil">
          {tweetsMeuPerfil.map((tweet) => <TweetContainer key={tweet.id} tweet={tweet} />)}
        </Route>
      </div>

    </div>
  );
}

export default App;
