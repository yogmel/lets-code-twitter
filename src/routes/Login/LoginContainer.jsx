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
    <>
      {isLogin && <Login toggleView={toggleView} />}
      {!isLogin && <Signup toggleView={toggleView} />}
    </>
  );
};

export default LoginContainer;
