import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Nav, NavItem, NavLink, TabContent, Tabs, TabPane } from 'reactstrap';
import { TweetContainer } from './components';

import { tweets, users } from './data';


function App() {
  const tweetsDataFormatada = tweets.map((tweet) => {
    const dataFormatada = `${tweet.date.getDate() + 1}/${tweet.date.getMonth()}/${tweet.date.getFullYear()}`;
    return {
      ...tweet,
      date: dataFormatada
    }
  });

  const tweetsComAutor = tweetsDataFormatada.map((tweet) => {
    const user = users.find((user) => {
      return tweet.author === user.id;
    })

    return {
      ...tweet,
      author: user
    }
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
              onClick={() => {}}
            >
              Geral
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={"1"}>
          <TabPane tabId="1">
            {/* componente do tweet */}
            {tweetsComAutor.map((tweet) => <TweetContainer key={tweet.id} tweet={tweet} />)}
          </TabPane>
        </TabContent>
      </div>

    </div>
  );
}

export default App;
