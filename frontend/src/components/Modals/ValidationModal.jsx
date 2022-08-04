const ValidationModal = ({ message, close }) => {
  return (
    <div className={`modal validation-modal`}>
      <i className="far fa-check-circle"></i>
      <br />
      {message}
      <button className="btn" onClick={close} autoFocus={true}>
        OK
      </button>
    </div>
  );
};

export default ValidationModal;
