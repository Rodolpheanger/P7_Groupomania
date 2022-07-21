import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { TokenContext } from "../../contexts/token.context";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";

const CommentsByPost = ({ postUid }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [displayComment, setDisplayComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [token] = useContext(TokenContext);

  const getComments = async () => {
    try {
      const response = await axios.get(`api/comments/${postUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setComments(response.data);
      setCommentsCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async (values) => {
    try {
      await axios.post(`/api/comments/${postUid}`, values, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setRefresh(!refresh);
      setDisplayComment(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="comment-box">
      <CommentsForm submit={addComment} label={"Ajouter un commentaire"} />
      <div className="comment-count">
        <p>
          {commentsCount}
          <i
            className="fa-regular fa-comment-dots"
            title="Afficher"
            onClick={() => setDisplayComment(!displayComment)}
          ></i>
        </p>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.c_uid}
          postUid={postUid}
          comment={comment}
          displayComment={displayComment}
          setDisplayComment={setDisplayComment}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
};

export default CommentsByPost;
