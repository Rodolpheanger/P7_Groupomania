import CancelBtn from "../Buttons/CancelBtn";
import ValidateBtn from "../Buttons/ValidateBtn";

const ConfirmationModal = ({ message, validate, cancel }) => {
  return (
    <div className={`modal confirmation-modal`}>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <p>{message}</p>
      <div>
        <ValidateBtn validate={validate} />
        <CancelBtn cancel={cancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
