import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Routes } from "./routes";

function App() {
  // const tweetsDataFormatada = tweets.map((tweet) => {
  //   const dataFormatada = `${
  //     tweet.date.getDate() + 1
  //   }/${tweet.date.getMonth()}/${tweet.date.getFullYear()}`;
  //   return {
  //     ...tweet,
  //     date: dataFormatada,
  //   };
  // });

  // const tweetsComAutor = tweetsDataFormatada.map((tweet) => {
  //   const user = users.find((user) => {
  //     return tweet.author === user.id;
  //   });

  //   return {
  //     ...tweet,
  //     author: user,
  //   };
  // });

  // const tweetsMeuPerfil = tweetsComAutor.filter((tweet) => {
  //   return idUsuarioLogado === tweet.author.id;
  // });

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
