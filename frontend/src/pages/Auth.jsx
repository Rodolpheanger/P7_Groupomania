import { useEffect } from "react";
import Log from "../components/Auth/Log";

const Auth = () => {
  useEffect(() => {
    document.title = "Bienvenue chez Groupomania";
  }, []);

  return (
    <main className="auth">
      <Log signin={true} signup={false} />
    </main>
  );
};

export default Auth;
