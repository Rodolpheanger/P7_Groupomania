import React, { Fragment, useState, useContext } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ReloadContext } from "../../contexts/reload.context";

const AddNewPost = () => {
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [, setOldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);
  const [reload, setReload] = useContext(ReloadContext);
  const openPostForm = () => {
    setOldImgUrl("");
    // reload(false);
    setDisplayPostForm(true);
  };
  const submit = async (values, actions) => {
    actions.setSubmitting(false);
    try {
      if (!values.post_image || !selectedImage) {
        const { title, content } = values;
        const datas = { title, content };
        const response = await axios.post("api/posts", datas, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const { message, error } = response.data;
        setResponseMessage(message);
        setDisplayValidationModal(true);

        return error ? alert(error) : console.log(message);
      } else {
        const response = await axios.post("api/posts", values, {
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
  const close = () => {
    setSelectedImage("");
    setDisplayPostForm(false);
  };
  const closeValidationModal = () => {
    setDisplayPostForm(false);
    setDisplayValidationModal(false);
    setReload(!reload);
  };
  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={closeValidationModal}
      ></ValidationModal>
    </ModalWrapper>
  );

  return (
    <Fragment>
      {validationModal}
      {!displayPostForm ? (
        <button onClick={openPostForm} className="btn btn-add-post">
          Ajouter un post
        </button>
      ) : (
        <ModalWrapper>
          <PostForm close={close} submit={submit} />
        </ModalWrapper>
      )}
    </Fragment>
  );
};

export default AddNewPost;
