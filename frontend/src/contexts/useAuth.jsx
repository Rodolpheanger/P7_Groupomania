import React, { useState } from "react";

const authContext = React.createContext();

export const useAuth = () => {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return setAuthed(true);
    },

    logout() {
      return setAuthed(false);
    },
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const AuthConsumer = () => {
  return React.useContext(authContext);
};
