import CloseBtn from "../Buttons/CloseBtn";
import ProfilBodyForm from "../Profil/ProfilBodyForm";

const ProfilBodyEditionModal = ({
  userUid,
  username,
  email,
  firstname,
  lastname,
  bio,
  closeProfilEditionModal,
}) => {
  return (
    <article className="modal profil-body-edition-modal">
      <ProfilBodyForm
        userUid={userUid}
        username={username}
        email={email}
        firstname={firstname}
        lastname={lastname}
        bio={bio}
        close={closeProfilEditionModal}
      />
      <CloseBtn close={closeProfilEditionModal} />
    </article>
  );
};

export default ProfilBodyEditionModal;
