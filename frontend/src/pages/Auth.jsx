import React from "react";
import Log from "../components/Auth/Log";

const Auth = () => {
  return (
    <div className="auth">
      <Log signin={true} signup={false} />
    </div>
  );
};

export default Auth;
