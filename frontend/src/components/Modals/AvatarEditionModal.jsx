import AvatarForm from "../Profil/AvatarForm";
import CloseBtn from "../Buttons/CloseBtn";

const AvatarEditionModal = ({ setFieldValue, close }) => {
  return (
    <div className="modal avatar-edition-modal">
      <AvatarForm setFieldValue={setFieldValue} close={close} />
      <CloseBtn close={close} />
    </div>
  );
};

export default AvatarEditionModal;
