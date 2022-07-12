const CancelBtn = ({ cancel }) => {
  return (
    <button className="btn btn-cancel" type="button" onClick={cancel}>
      Annuler
    </button>
  );
};

export default CancelBtn;
