import { useContext, useEffect, useState } from "react";
import * as axios from "axios";
import Loader from "../Loader/Loader";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";
import { TokenContext } from "../../contexts/token.context";
import { CharCountContext } from "../../contexts/charCount.context";

const CommentsByPost = ({ postUid }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [displayComment, setDisplayComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [oldComment, setOldComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const [, setCharCount] = useContext(CharCountContext);

  const getComments = async () => {
    try {
      const response = await axios.get(`api/comments/${postUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setCharCount(0);
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
      setCharCount(0);
      setOldComment("");
      setRefresh(!refresh);
      setDisplayComment(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getComments();
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="comment-box">
      {isLoading && <Loader />}
      <CommentsForm
        submit={addComment}
        oldComment={oldComment}
        label={"Ajouter un commentaire"}
      />
      <div className="comment-count">
        <p>
          {commentsCount}
          <button
            className="fa-regular fa-comment-dots"
            title="Afficher"
            onClick={() => setDisplayComment(!displayComment)}
            tabIndex={0}
          ></button>
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
