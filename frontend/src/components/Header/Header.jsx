import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../styles/assets/img/icons/icon-left-font-monochrome-black.png";
import ConfirmationModal from "../Modals/ConfirmationModal";
import ModalWrapper from "../Modals/ModalWrapper";

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
          <img src={logo} alt="Logo groupomania" />
        </Link>
        <div className="nav-right-icons">
          <Link to="/profil">
            <i className="fa-solid fa-user-gear " title="Mon Compte"></i>
          </Link>
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            onClick={logout}
            title="Déconnexion"
          ></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
