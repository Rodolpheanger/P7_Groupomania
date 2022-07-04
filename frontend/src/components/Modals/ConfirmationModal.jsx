const ConfirmationModal = ({ message, className, validate, cancel }) => {
  return (
    <div className={`modal ${className}`}>
      {message}
      <br />
      <div>
        <button className="btn" onClick={validate}>
          Valider
        </button>
        <button className="btn btn-cancel" onClick={cancel}>
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
