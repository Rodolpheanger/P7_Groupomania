import { Link } from "react-router-dom";
import logo from "../../styles/assets/img/icons/icon-left-font-monochrome-black.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/posts">
          <img src={logo} alt="Logo groupomania" />
        </Link>
        <div>
          <Link to="/profil">Mon compte</Link>
          <button>Déconnexion</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
