function ServerErrorMessage({ message }) {
  return message !== false && <p className="text-danger">{message}</p>;
}

export default ServerErrorMessage;
