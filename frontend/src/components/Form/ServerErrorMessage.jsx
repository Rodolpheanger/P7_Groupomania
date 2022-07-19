import { Fragment } from "react";

function ServerErrorMessage({ message }) {
  return (
    message !== false && (
      <Fragment>
        <br />
        <p className="text-danger">{message}</p>
        <br />
      </Fragment>
    )
  );
}

export default ServerErrorMessage;
