import React from "react";
import Log from "../components/Log/index";

const auth = () => {
  return (
    <div>
      <h1>Authentification</h1>
      <Log login={false} signup={true} />
    </div>
  );
};

export default auth;
