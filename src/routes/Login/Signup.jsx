import { useState } from "react";
import { signUp } from "./../../db/firebaseConfig";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { toggleView } = props;
  const history = useHistory();

  const setLoginError = (err) => {
    setError(err);
  };

  const redirectToHome = () => {
    history.push("/geral");
  };

  const createUser = () => {
    signUp(username, email, password, redirectToHome, setLoginError);
  };

  return (
    <>
      <h2 className="login-title">Faça seu cadastro</h2>
      <section className="login-form">
        <div className="input-group">
          <label>Username</label>
          <input
            placeholder="Insira seu usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            placeholder="Insira seu usuario"
            onChange={(e) => setEmail(e.target.value)}
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
          Já tenho cadastro
        </button>
        <button onClick={createUser} className="btn btn-primary">
          Cadastrar
        </button>
        {error && <p className="login-error">{error}</p>}
      </section>
    </>
  );
}

export default Signup;
