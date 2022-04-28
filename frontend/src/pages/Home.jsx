import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navToAuth = () => {
    setTimeout(() => {
      navigate("/auth");
    }, 3000);
  };
  navToAuth();

  return (
    <div>
      <h1>
        <img src="./img/icons/icon-above-font.png" alt="Pouet" />
      </h1>
    </div>
  );
};

export default Home;
