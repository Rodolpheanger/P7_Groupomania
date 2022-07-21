import CancelBtn from "../Buttons/CancelBtn";
import ValidateBtn from "../Buttons/ValidateBtn";

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
      <p className="text-danger">{serverErrorMessage}</p>
      <div>
        <ValidateBtn validate={validate} />
        <CancelBtn cancel={cancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
