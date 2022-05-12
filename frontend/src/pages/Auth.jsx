import React from "react";
import Log from "../components/Auth/index";

const auth = () => {
  return (
    <div>
      <Log login={false} signup={true} />
    </div>
  );
};

export default auth;
