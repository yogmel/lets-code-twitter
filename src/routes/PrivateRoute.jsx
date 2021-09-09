import { Redirect, Route } from "react-router-dom";
import verifyAuthentication from "./Login/login-functions";

const PrivateRoute = ({ children, role, ...rest }) => (
  <Route
    {...rest}
    render={() => (verifyAuthentication(role) ? children : <Redirect to="/" />)}
  />
);
export default PrivateRoute;
