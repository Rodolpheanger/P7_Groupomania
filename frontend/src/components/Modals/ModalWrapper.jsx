import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ close, children }) => {
  const modalPortal = document.getElementById("modal-root");
  const closeModal = () => {
    close();
  };
  return ReactDOM.createPortal(
    <div className="modal-background" onClick={() => closeModal()}>
      {children}
    </div>,

    modalPortal
  );
};

export default Modal;
