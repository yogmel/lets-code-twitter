const verifyAuthentication = (role) => {
  const token = localStorage.getItem("session-token");

  if (!token) {
    return false;
  }

  const result = localStorage.getItem("logins");
  const database = JSON.parse(result);

  const user = database.find((user) => user.token === token);

  if (!user) {
    return false;
  }

  return user.roles.some((r) => r === role);
};

export default verifyAuthentication;
