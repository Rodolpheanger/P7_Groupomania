import { Fragment } from "react";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";

const Avatar = ({ avatarUrl, username, className }) => {
  return (
    <Fragment>
      <img
        src={avatarUrl ? avatarUrl : defaultAvatar}
        alt={avatarUrl ? `avatar de ${username}` : "Avatar par défaut"}
        className={`avatar ${className}`}
      />
    </Fragment>
  );
};

export default Avatar;
