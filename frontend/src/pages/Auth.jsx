import React from "react";
import Log from "../components/Auth/index";

const auth = () => {
  return (
    <div className="auth">
      <Log signin={false} signup={true} />
    </div>
  );
};

export default auth;
