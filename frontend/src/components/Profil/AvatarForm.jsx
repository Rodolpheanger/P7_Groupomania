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

const AvatarForm = ({ avatarOwnerUid, closeAvatarEditionModal }) => {
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);
  const [, setNewImgUrl] = useContext(NewImgUrlContext);

  const setAvatar = async (values) => {
    if (typeof values.avatar === "string") {
      const datasToSend = {
        avatarOwnerUid: avatarOwnerUid,
        avatar: "",
      };

      try {
        const response = await axios.put("api/users/upload", datasToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDisplayValidationModal(true);
        setResponseMessage(response.data.message);
        setNewImgUrl("");
        setOldImgUrl("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const datasToSend = {
          avatarOwnerUid: avatarOwnerUid,
          avatar: values.avatar,
        };
        console.log(datasToSend);

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
      } catch (err) {
        console.log(err);
      }
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
        {({ isSubmitting, setFieldValue }) => (
          <Form className="avatar-form-card">
            <FileInput inputName="avatar" setFieldValue={setFieldValue} />
            <Thumbnail className="thumbnail-avatar" />
            <button type="submit" className="btn" disabled={isSubmitting}>
              Valider
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AvatarForm;
