import { Link } from "react-router-dom";
import logo from "../../styles/assets/img/icons/icon-left-font-monochrome-black.png";

const Header = () => {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/posts" className="header-logo">
          <img src={logo} alt="Logo groupomania" />
        </Link>
        <div className="nav-right-icons">
          <Link to="/profil">
            <i className="fa-solid fa-user-gear " title="Mon Compte"></i>
          </Link>
          <Link to="/">
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              onClick={logout}
              title="Déconnexion"
            ></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
