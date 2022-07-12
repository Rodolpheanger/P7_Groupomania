import AvatarForm from "../Profil/AvatarForm";
import CloseBtn from "../Buttons/CloseBtn";

const AvatarEditionModal = ({ avatarOwnerUid, setFieldValue, close }) => {
  return (
    <div className="modal avatar-edition-modal">
      <AvatarForm
        avatarOwnerUid={avatarOwnerUid}
        setFieldValue={setFieldValue}
        close={close}
      />
      <CloseBtn close={close} />
    </div>
  );
};

export default AvatarEditionModal;
