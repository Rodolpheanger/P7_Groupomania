const ValidationModal = ({ message, close }) => {
  return (
    <article className={`modal validation-modal`}>
      <i className="far fa-check-circle"></i>
      <br />
      {message}
      <button className="btn" onClick={close} autoFocus={true}>
        OK
      </button>
    </article>
  );
};

export default ValidationModal;
