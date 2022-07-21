import React from "react";
import { Link } from "react-router-dom";

const PostHeaderAuthor = ({
  userUid,
  username,
  creationDate,
  modificationDate,
}) => {
  return (
    <div className="author">
      <p>
        Publié par{" "}
        <Link
          to={`/profil/${userUid}`}
          className="italic bold author-username"
          title="Vers le profil de l'auteur"
        >
          {username}
        </Link>
      </p>

      <p className="italic">{creationDate}</p>
      {modificationDate && (
        <p className="post-modification-date">
          Dernière modification le
          <span className="italic"> {modificationDate} </span>
        </p>
      )}
    </div>
  );
};

export default PostHeaderAuthor;
