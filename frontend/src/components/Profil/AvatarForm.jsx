import { Fragment, useContext, useState } from "react";
import FileInput from "../Form/FileInput";
import Thumbnail from "../Form/Thumbnail";
import { Form, Formik } from "formik";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const AvatarForm = ({ avatarOwnerUid, closeAvatarEditionModal }) => {
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);
  const [, setNewImgUrl] = useContext(NewImgUrlContext);

  const setAvatar = async (values) => {
    console.log(values.avatar);
    try {
      if (values.avatar === oldImgUrl) {
        closeValidationModal();
      } else if (typeof values.avatar === "string") {
        const datasToSend = {
          avatarOwnerUid: avatarOwnerUid,
          avatar: "",
        };

        const response = await axios.put("api/users/upload", datasToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDisplayValidationModal(true);
        setResponseMessage(response.data.message);
        setNewImgUrl("");
        setOldImgUrl("");
      } else {
        const datasToSend = {
          avatarOwnerUid: avatarOwnerUid,
          avatar: values.avatar,
        };
        const response = await axios.put("api/users/upload", datasToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setDisplayValidationModal(true);
        setResponseMessage(response.data.message);
        setNewImgUrl(response.data.avatarUrl);
        setOldImgUrl(response.data.avatarUrl);
      }
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.dat.message);
    }
  };

  const closeValidationModal = () => {
    setDisplayValidationModal(false);
    closeAvatarEditionModal();
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
      <Formik onSubmit={setAvatar} initialValues={{ avatar: oldImgUrl }}>
        {({ isSubmitting }) => (
          <Form className="avatar-form-card">
            <FileInput />
            <Thumbnail className="thumbnail-avatar" />
            <ServerErrorMessage message={serverErrorMessage} />
            <button
              type="submit"
              className="btn"
              disabled={isSubmitting}
              autoFocus={true}
            >
              Valider
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AvatarForm;
