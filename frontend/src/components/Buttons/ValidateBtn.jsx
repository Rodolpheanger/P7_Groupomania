const ValidateBtn = ({ validate }) => {
  return (
    <button className="btn btn-validate" type="button" onClick={validate}>
      Valider
    </button>
  );
};

export default ValidateBtn;
