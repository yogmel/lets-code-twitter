import { Redirect, Route } from "react-router-dom";
import { getAuthUser } from "./../db/firebaseConfig";

const PrivateRoute = ({ children, role, ...rest }) => (
  <Route
    {...rest}
    render={() => (getAuthUser() ? children : <Redirect to="/login" />)}
  />
);
export default PrivateRoute;
