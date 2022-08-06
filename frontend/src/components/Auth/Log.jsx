import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ({ signup, signin }) => {
  const [signUpCard, setSignUpCard] = useState(signup);
  const [signInCard, setSignInCard] = useState(signin);
  const [forgetPassword, setForgetPassword] = useState(true);
  const selectSignCard = (e) => {
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
    <article className="auth-box">
      <ul className="auth-select-box">
        <button
          onClick={selectSignCard}
          id="signup"
          className={signUpCard ? "btn active-btn" : "btn"}
        >
          S'incrire
        </button>
        <button
          onClick={selectSignCard}
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
          setForgetPassword={setForgetPassword}
        />
      )}
      {signInCard && <SignInForm />}
      {forgetPassword && <p id="forgetpassword">Mot de passe oublié ?</p>}
    </article>
  );
};

export default Log;
