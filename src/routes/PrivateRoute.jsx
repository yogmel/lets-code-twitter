import { Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState(localStorage.getItem("loggedUser"));

  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    setUser(user);
  }, [location]);

  return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
};
export default PrivateRoute;
