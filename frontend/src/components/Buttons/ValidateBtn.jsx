import React from "react";

const ValidateBtn = ({ validate }) => {
  return (
    <button className="btn btn-validate" onClick={validate}>
      Valider
    </button>
  );
};

export default ValidateBtn;
