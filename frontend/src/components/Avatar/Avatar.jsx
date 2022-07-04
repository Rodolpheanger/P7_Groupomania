import React, { Fragment } from "react";

export const Avatar = ({ avatarUrl, username, defaultAvatar }) => {
  return (
    <Fragment>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`avatar de ${username}`}
          className="post-author-avatar"
        />
      ) : (
        <img
          src={defaultAvatar}
          alt="Avatar Neutre"
          className="default-avatar"
        />
      )}
    </Fragment>
  );
};
