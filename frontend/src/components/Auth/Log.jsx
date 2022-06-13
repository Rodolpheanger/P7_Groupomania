import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpCard, setSignUpCard] = useState(props.signup);
  const [signInCard, setSignInCard] = useState(props.signin);
  const [forgetPassword, setForgetPassword] = useState(true);
  const handleCards = (e) => {
    if (e.target.id === "signup") {
      setSignInCard(false);
      setSignUpCard(true);
      setForgetPassword(false);
    } else if (e.target.id === "signin") {
      setSignUpCard(false);
      setSignInCard(true);
      setForgetPassword(true);
    }
  };
  return (
    <div className="auth-box">
      <ul className="auth-select-box">
        <button
          onClick={handleCards}
          id="signup"
          className={signUpCard ? "btn active-btn" : "btn"}
        >
          S'incrire
        </button>
        <button
          onClick={handleCards}
          id="signin"
          className={signInCard ? "btn active-btn" : "btn"}
        >
          Se connecter
        </button>
      </ul>
      {signUpCard && (
        <SignUpForm
          setSignInCard={setSignInCard}
          setSignUpCard={setSignUpCard}
        />
      )}
      {signInCard && <SignInForm />}
      {forgetPassword && <p id="forgetpassword">Mot de passe oublié ?</p>}
    </div>
  );
};

export default Log;
