import React from "react";
import Routes from "./routes";
import { token } from "./utils/auth.utils";
import { AuthContext } from "./contexts/auth.context";

const App = () => {
  return (
    <div className="main-wrapper">
      <AuthContext.Provider value={token}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
};
export default App;
