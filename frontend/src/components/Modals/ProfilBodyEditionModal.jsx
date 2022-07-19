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
    <div className="modal profil-body-edition-modal">
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
    </div>
  );
};

export default ProfilBodyEditionModal;
