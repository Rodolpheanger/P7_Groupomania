import { useState } from "react";
import "./config/axios-config.js";
import AppRoutes from "./routes";
import { localAuthDatas } from "./utils/auth.utils";
import { TokenContext } from "./contexts/token.context";
import { UserRoleContext } from "./contexts/userRole.context";
import { UserUidContext } from "./contexts/userUid.context";

const App = () => {
  const localToken = localAuthDatas.token;
  const localUserRole = localAuthDatas.userRole;
  const localUserUid = localAuthDatas.userUid;
  const [token, setToken] = useState(localToken);
  const [userRole, setUserRole] = useState(localUserRole);
  const [userUid, setUserUid] = useState(localUserUid);
  return (
    <div className="main-wrapper">
      <TokenContext.Provider value={[token, setToken]}>
        <UserRoleContext.Provider value={[userRole, setUserRole]}>
          <UserUidContext.Provider value={[userUid, setUserUid]}>
            <AppRoutes />
          </UserUidContext.Provider>
        </UserRoleContext.Provider>
      </TokenContext.Provider>
    </div>
  );
};
export default App;
