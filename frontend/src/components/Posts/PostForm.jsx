import { useContext } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TexteArea";
import FileInput from "../Form/FileInput";
import Thumbnail from "../Form/Thumbnail";
import CloseBtn from "../Buttons/CloseBtn";
import ClientErrorMessage from "../Form/ClientErrorMessage";
import ServerErrorMessage from "../Form/ServerErrorMessage";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";

const PostForm = ({ close, submit, title, content, serverErrorMessage }) => {
  const [oldImgUrl] = useContext(OldImgUrlContext);
  const postSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Votre titre ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
    content: Yup.string()
      .max(255, "Votre post ne doit pas comporter plus de 255 caractères")
      .required("Ce champ est obligatoire"),
  });

  return (
    <article className="post-form">
      <Formik
        onSubmit={submit}
        initialValues={{
          title: title,
          content: content,
          post_image: oldImgUrl,
        }}
        validationSchema={postSchema}
      >
        {() => (
          <Form className="post-form-card">
            <Field
              name="title"
              displayname="Titre"
              component={TextInput}
              type="text"
              className="post-form-title"
              autoFocus={true}
            />
            <ErrorMessage name="title" component={ClientErrorMessage} />
            <FileInput />
            <Thumbnail className="thumbnail-post" />

            <br />
            <Field
              name="content"
              displayname="Contenu"
              currentCharCount={content && content.length}
              component={TextArea}
              rows="8"
            />
            <ErrorMessage name="content" component={ClientErrorMessage} />
            <br />
            <ServerErrorMessage message={serverErrorMessage} />
            <button type="submit" className="btn post-form-button">
              Publier
            </button>
          </Form>
        )}
      </Formik>
      <CloseBtn close={close} />
    </article>
  );
};

export default PostForm;
