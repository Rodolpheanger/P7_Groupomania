import React, { useState } from "react";
import { newToken } from "../utils/auth.utils";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  setToken(newToken);

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
