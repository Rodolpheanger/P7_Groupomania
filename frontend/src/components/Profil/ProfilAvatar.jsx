import { Fragment, useContext } from "react";
import Avatar from "../Avatar/Avatar";
import { UserUidContext } from "../../contexts/userUid.context";

const ProfilAvatar = ({ avatarUrl, username, uid, setAvatar }) => {
  const [userUid] = useContext(UserUidContext);
  return (
    <section className="profil-avatar-box">
      <Avatar
        avatarUrl={avatarUrl}
        username={username}
        className="avatar avatar-profil"
      />
      {uid === userUid && (
        <Fragment>
          <button className="btn" onClick={setAvatar}>
            {avatarUrl ? "Modifier avatar" : "Ajouter avatar"}
          </button>
        </Fragment>
      )}
      <hr className="hr-big" />
    </section>
  );
};

export default ProfilAvatar;
