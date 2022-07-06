import React, { Fragment, useState, useContext } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";

const AddNewPost = ({ reload }) => {
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [, setOldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);
  const openPostForm = () => {
    setOldImgUrl(null);
    reload(false);
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

        return error ? alert(error) : (console.log(message), reload(true));
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
        setSelectedImage(null);
        return error ? alert(error) : (console.log(message), reload(true));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const close = () => {
    setSelectedImage(null);
    setDisplayPostForm(false);
  };
  const closeValidationModal = () => {
    setDisplayPostForm(false);
    setDisplayValidationModal(false);
    reload(true);
  };
  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        className="validation-modal"
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
