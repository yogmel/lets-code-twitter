const LoggedUser = (props) => {
  const { users, idUsuarioLogado } = props;

  return (
    <div className="users-container">
      <p>Usuário logado:</p>
      <h3>{users[idUsuarioLogado].name}</h3>
      <strong>@{users[idUsuarioLogado].username}</strong>
    </div>
  );
};

export default LoggedUser;
