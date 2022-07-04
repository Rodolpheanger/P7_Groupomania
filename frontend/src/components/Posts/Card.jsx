import React, { useContext, useEffect, useState } from "react";
import { dateParser } from "../../utils/date.utils";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";
import { UserRoleContext } from "../../contexts/userRole.context";
import { UserUidContext } from "../../contexts/userUid.context";
import * as axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import { Avatar } from "../Avatar/Avatar";
import ModalWrapper from "../Modals/ModalWrapper";
import ConfirmationModal from "../Modals/ConfirmationModal";

const Card = ({ post, reload }) => {
  const [creationDate, setCreationDate] = useState("");
  const [modificationDate, setModificationDate] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);
  const [userRole] = useContext(UserRoleContext);
  const {
    u_uid,
    u_username,
    p_creation_date,
    u_avatar_url,
    p_post_img_url,
    p_title,
    p_content,
    p_modification_date,
    p_uid,
  } = post;

  const deletePost = () => {
    console.log("Delete Click: ", p_uid);
    axios
      .delete(`api/posts/${p_uid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    reload(true);
  };
  const closeConfirmationModal = () => {
    setDisplayConfirmationModal(false);
    reload(true);
  };

  const openConfirmationModal = () => {
    setDisplayConfirmationModal(true);
  };

  const confirmationModal = displayConfirmationModal && (
    <ModalWrapper close={closeConfirmationModal}>
      <ConfirmationModal
        message={"Vous allez supprimer ce post, souhaitez-vous continuer ?"}
        className="confirmation-modal"
        validate={deletePost}
        cancel={closeConfirmationModal}
      />
    </ModalWrapper>
  );

  useEffect(() => {
    if (userRole === "admin" || userUid === u_uid) setCanDelete(true);
    if (userUid === u_uid) setCanUpdate(true);
    setCreationDate(dateParser(p_creation_date));
    if (p_modification_date)
      setModificationDate(dateParser(p_modification_date));
  }, [userRole, userUid, u_uid, p_creation_date, p_modification_date]);

  return (
    <article className="post-card">
      <div className="post-card-header">
        <Avatar
          avatarUrl={u_avatar_url}
          username={u_username}
          defaultAvatar={defaultAvatar}
        />
        <div className="author">
          <p>
            Publié par <span className="italic bold">{u_username}</span>
          </p>

          <p className="italic">{creationDate}</p>
        </div>
        <div className="btn-post-header">
          {canUpdate && <i className="fa-solid fa-pen" title="Modifier"></i>}
          {canDelete && (
            <i
              className="fa-solid fa-trash-can"
              title="Supprimer"
              onClick={() => {
                openConfirmationModal();
              }}
            ></i>
          )}
          {confirmationModal}
        </div>
      </div>
      <p className="post-title">{p_title}</p>
      {p_post_img_url && (
        <img src={p_post_img_url} alt="Test" className="post-img" />
      )}
      <p className="post-content">{p_content}</p>
      <div className="like">
        <i className="fa-solid fa-heart" title="J'aime"></i>
        <p className="like-count"></p>
      </div>

      {modificationDate && (
        <p className="post-modification-date">
          Dernière modification le
          <span className="italic"> {modificationDate} </span>
        </p>
      )}
    </article>
  );
};

export default Card;
