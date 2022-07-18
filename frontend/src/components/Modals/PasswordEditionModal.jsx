import PasswordForm from "../Profil/PasswordForm";
import ButtonClose from "../Buttons/CloseBtn";

const PasswordEditionModal = ({ close }) => {
  return (
    <div className="modal password-edition-modal">
      <ButtonClose close={close} />
      <PasswordForm close={close} />
    </div>
  );
};

export default PasswordEditionModal;
