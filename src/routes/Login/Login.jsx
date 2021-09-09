import { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "./../../db/firebaseConfig";

function Login(props) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { toggleView } = props;

  const history = useHistory();
  const authenticateWithGoogle = () => {
    signInWithGoogle();
    history.push("/geral");
  };

  return (
    <>
      <h2 className="login-title">Faça seu login</h2>
      <section className="login-form">
        <div className="input-group">
          <label>Username</label>
          <input
            placeholder="Insira seu usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-link" onClick={toggleView}>
          Não possuo cadastro ainda
        </button>

        <button onClick={authenticateWithGoogle} className="btn btn-primary">
          Entrar com Google
        </button>

        <button onClick={authenticateWithGoogle} className="btn btn-primary">
          Entrar
        </button>
        {error && <p className="login-error">{error}</p>}
      </section>
    </>
  );
}

export default Login;
