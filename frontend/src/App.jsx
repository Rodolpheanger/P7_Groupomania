import React from "react";
// import { AuthProvider } from "./contexts/auth.context";
import Routes from "./routes";
import { newToken } from "./utils/auth.utils";
import { AuthContext } from "./contexts/auth.context";

const App = () => {
  return (
    <div className="main-wrapper">
      <AuthContext.Provider value={newToken}>
        {/* <AuthProvider> */}
        <Routes />
        {/* </AuthProvider> */}
      </AuthContext.Provider>
    </div>
  );
};
export default App;

// TODO voir pour ce type de provider !!!
