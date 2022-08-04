import * as axios from "axios";
import { Fragment, useContext, useState } from "react";
import { TokenContext } from "../../contexts/token.context";
import CommentsBodyButtons from "./CommentsBodyButtons";
import dateParser from "../../utils/date.utils";
import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import ModalWrapper from "../Modals/ModalWrapper";
import CommentEditionModal from "../Modals/CommentEditionModal";
import ValidationModal from "../Modals/ValidationModal";
import ConfirmationModal from "../Modals/ConfirmationModal";

const Comment = ({ comment, refresh, displayComment, setRefresh }) => {
  const [displayCommentEditionModal, setDisplayCommentEditionModal] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [displayCommentDeleteModal, setDisplayCommentDeleteModal] =
    useState(false);
  const [token] = useContext(TokenContext);
  const {
    c_uid,
    c_content,
    c_creation_date,
    c_modification_date,
    u_username,
    u_avatar_url,
    u_uid,
  } = comment;

  const editComment = async (values) => {
    try {
      const response = await axios.put(`/api/comments/${c_uid}`, values, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      console.log(response);
      setResponseMessage(response.data.message);
      setDisplayValidationModal(true);
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(`/api/comments/${c_uid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setResponseMessage(response.data.message);
      setDisplayValidationModal(true);
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };
  const closeCommentEditionModal = () => {
    setRefresh(!refresh);
    setDisplayValidationModal(false);
    setDisplayCommentEditionModal(false);
  };
  const closeCommentDeleteModal = () => {
    setRefresh(!refresh);
    setDisplayValidationModal(false);
  };
  const commentEditionModal = displayCommentEditionModal && (
    <ModalWrapper>
      <CommentEditionModal
        submit={editComment}
        oldComment={c_content}
        close={() => setDisplayCommentEditionModal(false)}
        serverErrorMessage={serverErrorMessage}
      />
    </ModalWrapper>
  );

  const commentDeleteModal = displayCommentDeleteModal && (
    <ModalWrapper>
      <ConfirmationModal
        message={
          "Vous êtes sur le point de supprimer ce commentaire, souhaitez-vous continuer ?"
        }
        validate={deleteComment}
        cancel={() => setDisplayCommentDeleteModal(false)}
        serverErrorMessage={serverErrorMessage}
      />
    </ModalWrapper>
  );
  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={() => {
          responseMessage.includes("modifié") && closeCommentEditionModal();
          responseMessage.includes("supprimé") && closeCommentDeleteModal();
        }}
      />
    </ModalWrapper>
  );

  return (
    <Fragment>
      {commentEditionModal}
      {validationModal}
      {commentDeleteModal}
      {displayComment && (
        <div key={c_uid} className="comment-content-box">
          <hr className="hr-medium" />
          <div className="comment-header">
            <p className="comment-header-username">
              <Link
                to={`/profil/${u_uid}`}
                className="italic bold author-username"
                title="Vers le profil de l'auteur"
              >
                {u_username}
              </Link>{" "}
            </p>
            <p className="italic">{dateParser(c_creation_date)}</p>

            <CommentsBodyButtons
              commentUserUid={u_uid}
              setDisplayCommentEditionModal={setDisplayCommentEditionModal}
              setDisplayCommentDeleteModal={setDisplayCommentDeleteModal}
              className="comment-header-buttons"
            />
          </div>
          <div className="comment-body">
            <Avatar
              avatarUrl={u_avatar_url}
              username={u_username}
              className="comment-body-avatar"
            />
            <p className="comment-body-content">{c_content}</p>
          </div>
          {c_modification_date && (
            <p className="comment-modification-date">
              Dernière modification le
              <span className="italic">
                {" "}
                {dateParser(c_modification_date)}{" "}
              </span>
            </p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Comment;
