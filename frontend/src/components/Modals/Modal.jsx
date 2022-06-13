import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const Modal = ({ message, className, close }) => {
  const modalPortal = document.getElementById("modal-root");
  const closeModal = () => {
    close();
  };
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modal-background" onClick={() => closeModal()}>
        <div className={`modal ${className}`}>
          {message}
          <br />
          <button className="btn">OK</button>
        </div>
      </div>
    </Fragment>,
    modalPortal
  );
};

export default Modal;
