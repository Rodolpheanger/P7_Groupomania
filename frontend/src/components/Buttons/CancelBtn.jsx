const CancelBtn = ({ cancel }) => {
  return (
    <button className="btn btn-cancel" onClick={cancel}>
      Annuler
    </button>
  );
};

export default CancelBtn;
