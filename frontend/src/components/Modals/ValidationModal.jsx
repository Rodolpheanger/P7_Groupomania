function ValidationModal({ message, className }) {
  return (
    <div className={`modal ${className}`}>
      {message}
      <br />
      <button className="btn">OK</button>
    </div>
  );
}

export default ValidationModal;
