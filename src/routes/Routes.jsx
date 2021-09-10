import { Route, Redirect } from "react-router-dom";
import { LoginContainer as Login } from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Tweets } from "./Tweets";

function Routes() {
  return (
    <>
      <PrivateRoute path="/geral">
        <Tweets />
      </PrivateRoute>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </>
  );
}

export default Routes;
