import React from "react";
import Log from "../components/Auth/Log";

const Auth = () => {
  return (
    <main className="auth">
      <Log signin={true} signup={false} />
    </main>
  );
};

export default Auth;
