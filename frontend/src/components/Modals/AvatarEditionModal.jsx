import AvatarForm from "../Profil/AvatarForm";
import CloseBtn from "../Buttons/CloseBtn";

const AvatarEditionModal = ({ avatarOwnerUid, close }) => {
  return (
    <article className="modal avatar-edition-modal">
      <AvatarForm
        avatarOwnerUid={avatarOwnerUid}
        closeAvatarEditionModal={close}
      />
      <CloseBtn close={close} />
    </article>
  );
};

export default AvatarEditionModal;
