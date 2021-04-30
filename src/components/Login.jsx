import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // [{
  //        "username": "joao",
  //        "password": "joao",
  //        "roles": ["admin"],
  //        "token": "11111"
  // },
  //        "username": "maria",
  //        "password": "maria",
  //        "roles": ["user"],
  //        "token": "22222"
  //]

  const authenticate = () => {
    const result = localStorage.getItem("logins");
    const database = JSON.parse(result);
    const loggedUser = database.find(
      (user) => user.username === username && user.password === password
    );

    if (!loggedUser) {
      setError("Usuário ou senha inválidos!");
    } else {
      localStorage.setItem("session-token", loggedUser.token);
      history.push("/geral");
    }
  };

  return (
    <div>
      <input
        placeholder="Insira seu usuario"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Insira sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={authenticate}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
