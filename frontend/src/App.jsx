import React, { useState } from "react";
// import { AuthProvider } from "./contexts/auth.context";
import Routes from "./routes";
import { localAuthDatas } from "./utils/auth.utils";
import { TokenContext } from "./contexts/token.context";
import { UserRoleContext } from "./contexts/userRole.context";
import { UserUidContext } from "./contexts/userUid.context";

const App = () => {
  const localToken = localAuthDatas.token;
  const localUserRole = localAuthDatas.userRole;
  const localUserUid = localAuthDatas.token;
  const [token, setToken] = useState(localToken);
  const [userRole, setUserRole] = useState(localUserRole);
  const [userUid, setUserUid] = useState(localUserUid);
  return (
    <div className="main-wrapper">
      <TokenContext.Provider value={[token, setToken]}>
        <UserRoleContext.Provider value={[userRole, setUserRole]}>
          <UserUidContext.Provider value={[userUid, setUserUid]}>
            <Routes />
          </UserUidContext.Provider>
        </UserRoleContext.Provider>
      </TokenContext.Provider>
    </div>
  );
};
export default App;
