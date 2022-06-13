import React, { useState } from "react";
// import { AuthProvider } from "./contexts/auth.context";
import Routes from "./routes";
import { newToken } from "./utils/auth.utils";
import { AuthContext } from "./contexts/auth.context";

const App = () => {
  const [token, setToken] = useState(newToken);
  return (
    <div className="main-wrapper">
      <AuthContext.Provider value={[token, setToken]}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
};
export default App;
