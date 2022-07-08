import React, { Fragment, useContext } from "react";
import { UserUidContext } from "../../contexts/userUid.context";
import { Avatar } from "../Avatar/Avatar";

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
