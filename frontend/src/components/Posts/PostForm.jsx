import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../Form/TextInput";
import CustomError from "../Form/ErrorMessage";
import TextArea from "../Form/TexteArea";
import Thumbnail from "../Form/Thumbnail";
import CloseBtn from "../Buttons/CloseBtn";
import FileInput from "../Form/FileInput";
import { useContext } from "react";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";

const PostForm = ({ close, submit, title, content }) => {
  const [oldImgUrl] = useContext(OldImgUrlContext);
  const postSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Votre titre ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
    content: Yup.string()
      .max(255, "Votre post ne doit pas comporter plus de 255 caractères")
      .required("Ce champ est obligatoire"),
  });

  // ! ------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ! FIXME: si ajout image puis retrait au clic sur le bouton fermer du thumbnail, impossible d'ajouter la même image à nouveau (une autre image fonctionne) !!!
  // ??? Fonctionne sur Firefox uniquement ????
  // ! ------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="post-form">
      <Formik
        onSubmit={submit}
        initialValues={{
          title: title,
          content: content,
          post_image: oldImgUrl,
        }}
        validationSchema={postSchema}
      >
        {({ isSubmitting }) => (
          <Form className="post-form-card">
            <Field
              name="title"
              displayname="Titre"
              component={TextInput}
              type="text"
              className="post-form-title"
            />
            <ErrorMessage name="title" component={CustomError} />
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
            <ErrorMessage name="content" component={CustomError} />
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn post-form-button"
            >
              Publier
            </button>
          </Form>
        )}
      </Formik>
      <CloseBtn close={close} />
    </div>
  );
};

export default PostForm;
