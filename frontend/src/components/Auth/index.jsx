import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const [forgetPassword, setForgetPassword] = useState(false);
  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignInModal(false);
      setSignUpModal(true);
      setForgetPassword(false);
    } else if (e.target.id === "signin") {
      setSignUpModal(false);
      setSignInModal(true);
      setForgetPassword(true);
    }
  };
  return (
    <div className="auth-box">
      <ul className="auth-select-box">
        <button
          onClick={handleModals}
          id="signup"
          className={signUpModal ? "btn active-btn" : "btn"}
        >
          S'incrire
        </button>
        <button
          onClick={handleModals}
          id="signin"
          className={signInModal ? "btn active-btn" : "btn"}
        >
          Se connecter
        </button>
      </ul>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
      {forgetPassword && <p id="forgetpassword">Mot de passe oublié ?</p>}
    </div>
  );
};

export default Log;
