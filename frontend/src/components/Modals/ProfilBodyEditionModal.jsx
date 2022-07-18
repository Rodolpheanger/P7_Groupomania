import CloseBtn from "../Buttons/CloseBtn";
import ProfilBodyForm from "../Profil/ProfilBodyForm";

const ProfilBodyEditionModal = ({
  userUid,
  username,
  email,
  firstname,
  lastname,
  bio,
  close,
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
      />
      <CloseBtn close={close} />
    </div>
  );
};

export default ProfilBodyEditionModal;
