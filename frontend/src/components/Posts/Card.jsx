import React from "react";
import { dateParser } from "../../utils/date.utils";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";

const Card = ({ post }) => {
  const dateToDisplay = dateParser(post.p_creation_date);

  const avatar = post.u_avatar_url ? (
    <img
      src={post.u_avatar_url}
      alt={`avatar de ${post.u_username}`}
      className="post-author-avatar"
    />
  ) : (
    <img src={defaultAvatar} alt="Avatar Neutre" className="default-avatar" />
  );

  return (
    <div className="post-card">
      <div className="post-card-header">
        {avatar}
        <div className="author">
          <p>
            Publié par <span className="italic bold">{post.u_username}</span>
          </p>

          <p className="italic">{dateToDisplay}</p>
        </div>
        <div className="btn-post-header">
          <button className="btn-post-edit">edit</button>
          <button className="btn-post-delete">delete</button>
        </div>
      </div>
      {post.p_post_img_url && (
        <img src={post.p_post_img_url} alt="Test" className="post-img" />
      )}
      <p className="post-title">{post.p_title}</p>
      <p className="post-content">{post.p_content}</p>
      <button className="btn-post-like">like</button>
    </div>
  );
};

export default Card;
