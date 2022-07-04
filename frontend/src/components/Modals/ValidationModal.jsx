const ValidationModal = ({ message, className, close }) => {
  return (
    <div className={`modal ${className}`}>
      {message}
      <br />
      <button className="btn" onClick={close}>
        OK
      </button>
    </div>
  );
};

export default ValidationModal;
