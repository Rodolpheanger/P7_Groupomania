import React from "react";
import { dateParser } from "../../utils/date.utils";

const Card = ({ post }) => {
  const dateToDisplay = dateParser(post.p_creation_date);
  return (
    <div className="post-card">
      <img src={post.p_post_img_url} alt="" />
      <div>
        <p>{post.p_title}</p>
        <p>Publié par : {post.u_username}</p>
      </div>
      <p>{post.p_content}</p>
      <p>le {dateToDisplay}</p>
    </div>
  );
};

export default Card;
