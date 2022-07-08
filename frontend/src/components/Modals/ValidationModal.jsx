const ValidationModal = ({ message, close }) => {
  return (
    <div className={`modal validation-modal`}>
      {message}
      <br />
      <button className="btn" onClick={close}>
        OK
      </button>
    </div>
  );
};

export default ValidationModal;
