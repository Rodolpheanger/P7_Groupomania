import { Fragment } from "react";
import FileInput from "../Form/FileInput";
import Thumbnail from "../Form/Thumbnail";
import { Form, Formik } from "formik";

const AvatarForm = ({ setFieldValue }) => {
  const updateAvatar = (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <Formik onSubmit={updateAvatar}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="avatar-form-card">
            <FileInput name="avatar" setFieldValue={setFieldValue} />
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
