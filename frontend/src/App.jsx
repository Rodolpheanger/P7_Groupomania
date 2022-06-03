import React from "react";
import { AuthContext } from "./components/MyContexts";
import Routes from "./routes";
import { token } from "./utils/auth.utils";

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
