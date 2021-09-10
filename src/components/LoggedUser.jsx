import { getCurrentUser, signOut } from "./../db/firebaseConfig";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoggedUser.css";

const LoggedUser = () => {
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  const fetchUser = async () => {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }
    if (!user) {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
      } catch (e) {
        console.log("deu ruim", e);
      }
    }
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
      <h3>{currentUser.displayName ?? currentUser.username}</h3>
      <strong>{currentUser.email}</strong>
      <button className="btn btn-link" onClick={signOutUser}>
        Sair
      </button>
    </div>
  );
};

export default LoggedUser;
