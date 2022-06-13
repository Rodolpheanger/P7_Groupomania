import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../Form/TextInput";
import CustomError from "../Form/ErrorInput";
import { AuthContext } from "../../contexts/auth.context";
import TextArea from "../Form/TexteArea";
import Thumbnail from "../Form/Thumbnail";
import ButtonClose from "../Buttons/ButtonClose";

const AddPostForm = ({ reload, displayForm }) => {
  console.log("AddPostForm");
  const [token] = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const postSchema = Yup.object().shape({
    title: Yup.string().required("Ce champ est obligatoire"),
    content: Yup.string()
      .min(1, "Votre post doit comporter au moins 1 caractères")
      .max(255, "Votre post ne doit pas comporter plus de 255 caractères")
      .required("Ce champ est obligatoire"),
  });
  const close = () => {
    displayForm(false);
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
        reload(true);
        displayForm(false);

        return error
          ? alert(error)
          : (console.log(message), navigate("/posts"));
      } else {
        const response = await axios.post("api/posts", values, {
          headers: {
            Authorization: `BEARER ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const { message, error } = response.data;
        reload(true);
        displayForm(false);
        return error
          ? alert(error)
          : (console.log(message), navigate("/posts"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-post-form">
      <Formik
        onSubmit={submit}
        initialValues={{ title: "Test", content: "Re Test", post_image: "" }}
        validationSchema={postSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="add-post-card">
            <Field
              name="title"
              displayname="Titre"
              component={CustomInput}
              type="text"
            />
            <ErrorMessage name="title" component={CustomError} />
            <br />
            <Field
              name="content"
              displayname="Contenu"
              component={TextArea}
              rows="5"
            />
            <ErrorMessage name="content" component={CustomError} />
            <br />
            <label htmlFor="post_image" className="btn label-file">
              Ajouter une image
            </label>
            <input
              id="post_image"
              className="input-file"
              type="file"
              name="post_image"
              accept=".png, .jpg, .jpeg"
              onChange={(event) => {
                setFieldValue("post_image", event.currentTarget.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            <Thumbnail
              image={selectedImage}
              deleteThumbnailImage={setSelectedImage}
              deleteImage={setFieldValue}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn add-post-form-button"
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

export default AddPostForm;
