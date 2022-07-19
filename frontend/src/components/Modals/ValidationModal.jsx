const ValidationModal = ({ message, close }) => {
  return (
    <div className={`modal validation-modal`}>
      <i className="far fa-check-circle"></i>
      <br />
      {message}
      <br />
      <button className="btn" onClick={close}>
        OK
      </button>
    </div>
  );
};

export default ValidationModal;
