import React from "react";

function ButtonClose({ close }) {
  return (
    <button className="btn btn-close" onClick={close}>
      X
    </button>
  );
}

export default ButtonClose;
