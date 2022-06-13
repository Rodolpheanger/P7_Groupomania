import React, { useState } from "react";
// import { AuthProvider } from "./contexts/auth.context";
import Routes from "./routes";
import { newToken } from "./utils/auth.utils";
import { AuthContext } from "./contexts/auth.context";

const App = () => {
  const [token, setToken] = useState(newToken);
  // setToken(newToken);
  // useEffect(() => {
  //   console.log("UseEffect auth.context");
  //   setToken(newToken);
  // }, [localStorage.getItem("data")]);

  return (
    <div className="main-wrapper">
      <AuthContext.Provider value={[token, setToken]}>
        {/* <AuthProvider> */}
        <Routes />
        {/* </AuthProvider> */}
      </AuthContext.Provider>
    </div>
  );
};
export default App;

// TODO voir pour ce type de provider !!!
