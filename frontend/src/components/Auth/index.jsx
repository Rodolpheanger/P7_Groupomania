import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [loginModal, setLoginModal] = useState(props.login);
  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };
  return (
    <div className="auth-box">
      <ul className="auth-select-box">
        <li
          onClick={handleModals}
          id="signup"
          className={signUpModal ? "btn active-btn" : "btn"}
        >
          S'incrire
        </li>
        <li
          onClick={handleModals}
          id="login"
          className={loginModal ? "btn active-btn" : "btn"}
        >
          Se connecter
        </li>
      </ul>
      {signUpModal && <SignupForm />}
      {loginModal && <LoginForm />}
    </div>
  );
};

export default Log;
