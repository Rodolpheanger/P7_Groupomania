import PasswordForm from "../Profil/PasswordForm";
import ButtonClose from "../Buttons/CloseBtn";

const PasswordEditionModal = ({ close }) => {
  return (
    <article className="modal password-edition-modal">
      <ButtonClose close={close} />
      <PasswordForm close={close} />
    </article>
  );
};

export default PasswordEditionModal;
