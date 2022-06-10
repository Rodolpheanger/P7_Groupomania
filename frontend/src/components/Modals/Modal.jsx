import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ message, className, close, navigateTo }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    close();
    navigate(navigateTo);
  };
  return (
    <div className={`modal ${className}`} onClick={() => closeModal()}>
      {message}
      <button className="btn" onClick={() => closeModal()}>
        OK
      </button>
    </div>
  );
};

export default Modal;
