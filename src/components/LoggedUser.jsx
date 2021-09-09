import { getCurrentUser, signOut } from "./../db/firebaseConfig";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoggedUser.css";

const LoggedUser = () => {
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  const fetchUser = async () => {
    const currentUser = await getCurrentUser();
    console.log("currentUser", currentUser);
    setCurrentUser(currentUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const redirectToLogin = async () => {
    history.push("/login");
  };

  const signOutUser = () => {
    signOut(redirectToLogin);
  };

  return (
    <div className="users-container">
      <p>Usuário logado:</p>
      <h3>{currentUser.username}</h3>
      <strong>{currentUser.email}</strong>
      <button className="btn btn-link" onClick={signOutUser}>
        Sair
      </button>
    </div>
  );
};

export default LoggedUser;
