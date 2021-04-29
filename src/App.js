import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { TweetContainer } from "./components";

import { tweets, users } from "./data";

function App() {
  const [tabAtiva, setTabAtiva] = useState("0");

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

  return (
    <div className="App">
      {/* widget de usuário logado */}
      <div className="users-container">
        <p>Usuário logado:</p>
        <h3>User</h3>
        <strong>@username</strong>
      </div>

      {/* tabs */}
      <div className="tweets-tabs">
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => { setTabAtiva("0") }}
            >
              Geral
						</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => { setTabAtiva("1") }}
            >
              Meu Perfil
						</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tabAtiva}>
          <TabPane tabId="0">
            {/* componente do tweet */}
            {tweetsComAutor.map((tweet) => <TweetContainer key={tweet.id} tweet={tweet} />)}
          </TabPane>
          <TabPane tabId="1">
            <div>Tab meu perfil</div>
          </TabPane>
        </TabContent>
      </div>

    </div>
  );
}

export default App;
