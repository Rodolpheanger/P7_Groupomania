import React from "react";

function ButtonClose({ close }) {
  return (
    <button className="btn btn-close" type="button" onClick={close}>
      X
    </button>
  );
}

export default ButtonClose;
