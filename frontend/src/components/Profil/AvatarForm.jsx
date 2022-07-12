import { Fragment, useContext } from "react";
import FileInput from "../Form/FileInput";
import Thumbnail from "../Form/Thumbnail";
import { Form, Formik } from "formik";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import axios from "axios";
import { TokenContext } from "../../contexts/token.context";

const AvatarForm = ({ setFieldValue, avatarOwnerUid }) => {
  const [oldImgUrl] = useContext(OldImgUrlContext);
  const [token] = useContext(TokenContext);

  const updateAvatar = async (values) => {
    console.log(values);
    const datasToSend = {
      avatarOwnerUid: avatarOwnerUid,
      avatar: values.avatar,
    };
    console.log(datasToSend);
    try {
      const response = await axios.put("api/users/upload", datasToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <Formik onSubmit={updateAvatar} initialValues={{ avatar: oldImgUrl }}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="avatar-form-card">
            <FileInput
              inputName="avatar"
              name="avatar"
              setFieldValue={setFieldValue}
            />
            <Thumbnail
              className="thumbnail-avatar"
              setFieldValue={setFieldValue}
            />
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
