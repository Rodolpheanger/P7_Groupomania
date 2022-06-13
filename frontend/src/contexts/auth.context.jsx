import React, { useState } from "react";
// import { newToken } from "../utils/auth.utils";

export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("");
//   setToken(newToken);
//   // useEffect(() => {
//   //   console.log("UseEffect auth.context");
//   //   setToken(newToken);
//   // }, [localStorage.getItem("data")]);

//   return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
// };
