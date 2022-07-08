import PasswordEditionForm from "../Profil/PasswordEditionForm";
import ButtonClose from "../Buttons/ButtonClose";

const PasswordEditionModal = ({ close }) => {
  return (
    <div className="modal password-edition-modal">
      <ButtonClose close={close} />

      <PasswordEditionForm />
    </div>
  );
};

export default PasswordEditionModal;
