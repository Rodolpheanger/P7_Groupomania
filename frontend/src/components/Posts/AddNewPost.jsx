import { Fragment, useState, useContext } from "react";
import * as axios from "axios";
import PostForm from "./PostForm";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { TokenContext } from "../../contexts/token.context";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ReloadContext } from "../../contexts/reload.context";
import { CharCountContext } from "../../contexts/charCount.context";

const AddNewPost = () => {
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [, setOldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);
  const [reload, setReload] = useContext(ReloadContext);
  const [, setCharCount] = useContext(CharCountContext);
  const openPostForm = () => {
    setOldImgUrl("");
    setDisplayPostForm(true);
  };
  const submit = async (values) => {
    try {
      if (!values.post_image || !selectedImage) {
        const { title, content } = values;
        const datas = { title, content };
        const response = await axios.post("api/posts", datas, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        setCharCount(0);
        setResponseMessage(response.data.message);
        setDisplayValidationModal(true);
      } else {
        const response = await axios.post("api/posts", values, {
          headers: {
            Authorization: `BEARER ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setCharCount(0);
        setResponseMessage(response.data.message);
        setDisplayValidationModal(true);
        setSelectedImage("");
      }
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
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
          <PostForm
            close={close}
            submit={submit}
            serverErrorMessage={serverErrorMessage}
          />
        </ModalWrapper>
      )}
    </Fragment>
  );
};

export default AddNewPost;
