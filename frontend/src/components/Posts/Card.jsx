import React, { useContext, useEffect, useState } from "react";
import dateParser from "../../utils/date.utils";
import { UserRoleContext } from "../../contexts/userRole.context";
import { UserUidContext } from "../../contexts/userUid.context";
import * as axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import { Avatar } from "../Avatar/Avatar";
import ModalWrapper from "../Modals/ModalWrapper";
import ConfirmationModal from "../Modals/ConfirmationModal";
import PostEditionModal from "../Modals/PostEditionModal";
import ValidationModal from "../Modals/ValidationModal";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import Likes from "./Likes";
import { Link } from "react-router-dom";
import { ReloadContext } from "../../contexts/reload.context";

const Card = ({ post }) => {
  const [creationDate, setCreationDate] = useState("");
  const [modificationDate, setModificationDate] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayPostEditionModal, setDisplayPostEditionModal] = useState(false);
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);
  const [userRole] = useContext(UserRoleContext);
  const [, setOldImgUrl] = useContext(OldImgUrlContext);
  const [, setSelectedImage] = useContext(ThumbImgContext);
  const [reload, setReload] = useContext(ReloadContext);
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
  const deletePost = async () => {
    try {
      const response = await axios.delete(`api/posts/${p_uid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setResponseMessage(response.data.message);
      setDisplayConfirmationModal(false);
      setDisplayValidationModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
    try {
      if (typeof values.post_image === "string") {
        console.log("test");
        const response = await axios.put(`api/posts/${p_uid}`, values, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const { message, error } = response.data;
        setResponseMessage(message);
        setDisplayValidationModal(true);

        return error ? alert(error) : console.log(message);
      } else {
        console.log("test 2");
        const response = await axios.put(`api/posts/${p_uid}`, values, {
          headers: {
            Authorization: `BEARER ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const { message, error } = response.data;
        setResponseMessage(message);
        setDisplayValidationModal(true);
        setSelectedImage("");
        return error ? alert(error) : console.log(message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const closePostEditionModal = () => {
    setDisplayPostEditionModal(false);
    setReload(!reload);
  };
  const closeValidationModal = () => {
    setDisplayPostEditionModal(false);
    setDisplayValidationModal(false);
    setReload(!reload);
  };
  const closeConfirmationModal = () => {
    setDisplayConfirmationModal(false);
    setReload(!reload);
  };

  const postEditionModal = displayPostEditionModal && (
    <ModalWrapper>
      <PostEditionModal
        submit={updatePost}
        postTitle={p_title}
        postContent={p_content}
        close={closePostEditionModal}
      />
    </ModalWrapper>
  );
  const confirmationModal = displayConfirmationModal && (
    <ModalWrapper>
      <ConfirmationModal
        message={"Vous allez supprimer ce post, souhaitez-vous continuer ?"}
        validate={deletePost}
        cancel={closeConfirmationModal}
      />
    </ModalWrapper>
  );

  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={closeValidationModal}
      ></ValidationModal>
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
      {validationModal}
      {confirmationModal}
      {postEditionModal}
      <div className="post-card-header">
        <Avatar
          avatarUrl={u_avatar_url}
          username={u_username}
          className="avatar-post-author"
        />
        <div className="author">
          <p>
            Publié par{" "}
            <Link
              to={`/profil/${u_uid}`}
              className="italic bold"
              title="Vers le profil de l'auteur"
            >
              {u_username}
            </Link>
          </p>

          <p className="italic">{creationDate}</p>
        </div>
        <div className="btn-post-header">
          {canUpdate && (
            <i
              className="fa-solid fa-pen"
              title="Modifier"
              onClick={() => {
                setDisplayPostEditionModal(true);
                setOldImgUrl(p_post_img_url);
              }}
            ></i>
          )}
          {canDelete && (
            <i
              className="fa-solid fa-trash-can"
              title="Supprimer"
              onClick={() => {
                setDisplayConfirmationModal(true);
              }}
            ></i>
          )}
        </div>
      </div>
      <p className="post-title">{p_title}</p>
      {p_post_img_url && (
        <img
          src={p_post_img_url}
          alt="Aucune description disponible"
          className="post-img"
        />
      )}
      <p className="post-content">{p_content}</p>
      <Likes postUid={p_uid} reload={reload} />
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
