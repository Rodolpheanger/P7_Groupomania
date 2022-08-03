import CancelBtn from "../Buttons/CancelBtn";
import ValidateBtn from "../Buttons/ValidateBtn";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const ConfirmationModal = ({
  message,
  validate,
  cancel,
  serverErrorMessage,
}) => {
  return (
    <div className={`modal confirmation-modal`}>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <span className="modal-message">{message}</span>
      <ServerErrorMessage message={serverErrorMessage} />
      <div>
        <ValidateBtn validate={validate} />
        <CancelBtn cancel={cancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
