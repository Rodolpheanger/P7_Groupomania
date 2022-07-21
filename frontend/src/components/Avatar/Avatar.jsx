import React, { Fragment } from "react";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";

export const Avatar = ({ avatarUrl, username, className }) => {
  return (
    <Fragment>
      {/* {avatarUrl ? ( */}
      <img
        src={avatarUrl ? avatarUrl : defaultAvatar}
        alt={avatarUrl ? `avatar de ${username}` : "Avatar par défaut"}
        className={`avatar ${className}`}
      />
      {/* ) : (
        <img
          src={defaultAvatar}
          alt="Avatar Neutre"
          className={`avatar ${className}`}
        />
      )} */}
    </Fragment>
  );
};
