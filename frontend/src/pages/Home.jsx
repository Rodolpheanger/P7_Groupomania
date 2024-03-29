import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../styles/assets/img/icons/icon-left-font-monochrome-white.png";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navToAuth = () => {
      setTimeout(() => {
        navigate("/auth");
      }, 2500);
    };
    navToAuth();
  }, [navigate]);

  return (
    <main className="home-wrapper">
      <h1>
        <img src={logo} alt="Logo Groupomania" />
      </h1>
    </main>
  );
};

export default Home;
