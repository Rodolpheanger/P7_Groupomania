import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextArea from "../Form/TexteArea";
import ClientErrorMessage from "../Form/ClientErrorMessage";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const CommentsForm = ({
  submit,
  oldComment,
  label,
  serverErrorMessage,
  modal,
}) => {
  const commentSchema = Yup.object().shape({
    content: Yup.string()
      .max(
        255,
        "Votre commentaire ne doit pas comporter plus de 255 caractères"
      )
      .required(" "),
  });

  return (
    <div className="comment-form">
      <Formik
        onSubmit={(values, { resetForm }) => {
          submit(values);
          resetForm();
        }}
        initialValues={{
          content: `${oldComment ? oldComment : ""}`,
        }}
        validationSchema={commentSchema}
      >
        {() => (
          <Form className="comment-form-card">
            <div className="comment-form-body">
              <Field
                name="content"
                displayname={label}
                currentCharCount={oldComment && oldComment.length}
                component={TextArea}
                rows="1"
                className="comment-form-textarea"
                autoFocus={modal && true}
              />
              <ErrorMessage name="content" component={ClientErrorMessage} />
              <ServerErrorMessage message={serverErrorMessage} />
            </div>
            <button type="submit" className="btn comment-form-button">
              Commenter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentsForm;
