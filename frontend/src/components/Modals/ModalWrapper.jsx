import React from "react";
import ReactDOM from "react-dom";

const ModalWrapper = ({ children }) => {
  const modalPortal = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <main className="modal-wrapper">{children}</main>,

    modalPortal
  );
};

export default ModalWrapper;
