import { useState } from "react";
import "./Login.css";
import Login from "./Login";
import Signup from "./Signup";

const LoginContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin && <Login toggleView={toggleView} />}
      {!isLogin && <Signup toggleView={toggleView} />}
    </div>
  );
};

export default LoginContainer;
