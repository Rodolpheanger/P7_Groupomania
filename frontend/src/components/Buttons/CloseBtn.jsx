import React from "react";

function CloseBtn({ close }) {
  return (
    <button className="btn btn-close" type="button" onClick={close}>
      X
    </button>
  );
}

export default CloseBtn;
