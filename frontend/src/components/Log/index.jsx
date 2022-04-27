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
    <div>
      <div>
        <div>
          <ul>
            <li
              onClick={handleModals}
              id="signup"
              className={signUpModal ? "active-btn" : null}
            >
              S'incrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={loginModal ? "active-btn" : null}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignupForm />}
          {loginModal && <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;
