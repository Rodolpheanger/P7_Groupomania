const CancelBtn = ({ cancel }) => {
  return (
    <button
      className="btn btn-cancel"
      type="button"
      onClick={cancel}
      autoFocus={true}
    >
      Annuler
    </button>
  );
};

export default CancelBtn;
