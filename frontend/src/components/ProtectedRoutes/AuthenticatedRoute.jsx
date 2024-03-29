import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext } from "../../contexts/token.context";

const AuthentificatedRoute = ({ children }) => {
  const [token] = useContext(TokenContext);
  if (!token) return <Navigate to={"/"} replace />;
  else return children ? children : <Outlet />;
};

export default AuthentificatedRoute;
