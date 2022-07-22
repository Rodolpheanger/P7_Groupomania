import { Fragment } from "react";

function ServerErrorMessage({ message }) {
  return (
    message && (
      <Fragment>
        <br />
        <p className="text-danger">{message}</p>
        <br />
      </Fragment>
    )
  );
}

export default ServerErrorMessage;
