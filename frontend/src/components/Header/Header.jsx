import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../styles/assets/img/icons/icon-left-font-monochrome-black.png";
import ModalWrapper from "../Modals/ModalWrapper";
import ConfirmationModal from "../Modals/ConfirmationModal";

const Header = () => {
  const navigate = useNavigate();
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const logout = () => {
    setDisplayConfirmationModal(true);
  };
  const cancel = () => {
    setDisplayConfirmationModal(false);
  };
  const validate = () => {
    setDisplayConfirmationModal(false);
    localStorage.clear();
    navigate("/auth");
  };

  const confirmationModal = displayConfirmationModal && (
    <ModalWrapper>
      <ConfirmationModal
        message={
          "Vous êtes sur le point de vous déconnecter, souhaitez-vous continuer ?"
        }
        className="confirmation-modal"
        validate={validate}
        cancel={cancel}
      />
    </ModalWrapper>
  );

  return (
    <header className="header">
      {confirmationModal}
      <nav className="header-nav">
        <Link to="/posts" className="header-logo">
          <img src={logo} alt="Logo groupomania" autoFocus={true} />
        </Link>
        <div className="nav-right-icons">
          <Link to="/users">
            <i className="fas fa-users" title="Tous les utilisateurs"></i>
          </Link>
          <Link to="/profil">
            <i className="fa-solid fa-user-gear " title="Mon Compte"></i>
          </Link>
          <button
            tabIndex={0}
            className="fa-solid fa-arrow-right-from-bracket"
            onClick={logout}
            title="Déconnexion"
          ></button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
