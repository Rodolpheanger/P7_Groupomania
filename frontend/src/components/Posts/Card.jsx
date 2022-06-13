import React, { useEffect, useState } from "react";
import { dateParser } from "../../utils/date.utils";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";

const Card = ({ post }) => {
  console.log("Card");
  const [creationDate, setCreationDate] = useState("");
  const [modificationDate, setModificationDate] = useState("");

  const {
    u_username,
    p_creation_date,
    u_avatar_url,
    p_post_img_url,
    p_title,
    p_content,
    p_modification_date,
  } = post;
  useEffect(() => {
    setCreationDate(dateParser(p_creation_date));
    if (p_modification_date)
      setModificationDate(dateParser(p_modification_date));
  }, [p_creation_date, p_modification_date]);

  return (
    <article className="post-card">
      <div className="post-card-header">
        {u_avatar_url ? (
          <img
            src={u_avatar_url}
            alt={`avatar de ${u_username}`}
            className="post-author-avatar"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt="Avatar Neutre"
            className="default-avatar"
          />
        )}
        <div className="author">
          <p>
            Publié par <span className="italic bold">{u_username}</span>
          </p>

          <p className="italic">{creationDate}</p>
        </div>
        <div className="btn-post-header">
          <i className="fa-solid fa-pen" title="Modifier"></i>
          <i className="fa-solid fa-trash-can" title="Supprimer"></i>
        </div>
      </div>
      {p_post_img_url && (
        <img src={p_post_img_url} alt="Test" className="post-img" />
      )}
      <p className="post-title">{p_title}</p>
      <p className="post-content">{p_content}</p>
      <i className="fa-solid fa-heart" title="J'aime"></i>
      {modificationDate && (
        <p className="post-modification-date">{`Dernière modification le ${modificationDate}`}</p>
      )}
    </article>
  );
};

export default Card;
