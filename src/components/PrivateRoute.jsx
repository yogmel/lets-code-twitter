import { Redirect, Route } from "react-router-dom";
import verifyAuthentication from "./login-functions";

const PrivateRoute = ({ children, role, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      verifyAuthentication(role) ? children : <Redirect to="/login" />
    }
  />
);
export default PrivateRoute;
