import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../Form/TextInput";
import CustomError from "../Form/ErrorInput";
import TextArea from "../Form/TexteArea";
import Thumbnail from "../Form/Thumbnail";
import ButtonClose from "../Buttons/ButtonClose";
import FileInput from "../Form/FileInput";

const PostForm = ({
  displayPostForm,
  submit,
  selectedImage,
  setSelectedImage,
}) => {
  const postSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, "Votre titre ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
    content: Yup.string()
      .max(255, "Votre post ne doit pas comporter plus de 255 caractères")
      .required("Ce champ est obligatoire"),
  });
  const close = () => {
    displayPostForm(false);
  };

  // ! ------------------------------------------------------------------------------------------------------------
  //  FIXME: si ajout image puis retrait au clic sur le bouton fermer du thumbnail, impossible d'ajouter la même image à nouveau (une autre image fonctionne) !!!
  // ! ------------------------------------------------------------------------------------------------------------

  return (
    <div className="post-form">
      <Formik
        onSubmit={submit}
        initialValues={{
          title: "",
          content: "",
          post_image: "",
        }}
        validationSchema={postSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="post-form-card">
            <Field
              name="title"
              displayname="Titre"
              component={CustomInput}
              type="text"
              className="form-post-title"
            />
            <ErrorMessage name="title" component={CustomError} />
            <FileInput
              name="post_image"
              setFieldValue={setFieldValue}
              setSelectedImage={setSelectedImage}
            />
            <Thumbnail
              image={selectedImage}
              deleteThumbnailImage={setSelectedImage}
              deleteImage={setFieldValue}
            />
            <br />
            <Field
              name="content"
              displayname="Contenu"
              component={TextArea}
              rows="5"
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
      <ButtonClose close={close} />
    </div>
  );
};

export default PostForm;
