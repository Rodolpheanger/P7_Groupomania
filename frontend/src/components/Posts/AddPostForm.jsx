import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
// import { useToken } from "../../utils/auth.utils";
import { AuthContext } from "../../contexts/auth.context";

const AddPostForm = () => {
  console.log("AddPostForm");
  const [token] = useContext(AuthContext);
  // const { token } = useToken();

  const navigate = useNavigate();
  const postSchema = Yup.object().shape({
    title: Yup.string().required("Ce champ est obligatoire"),
    content: Yup.string()
      .min(1, "Votre post doit comporter au moins 1 caractères")
      .max(255, "Votre post ne doit pas comporter plus de 255 caractères")
      .required("Ce champ est obligatoire"),
  });

  const submit = async (values, actions) => {
    actions.setSubmitting(false);
    console.log(values);
    try {
      if (!values.post_image) {
        const { title, content } = values;
        const datas = { title, content };
        const response = await axios.post("api/posts", datas, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const { message, error } = response.data;
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
        return error
          ? alert(error)
          : (console.log(message), navigate("/posts"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-group">
      <Formik
        onSubmit={submit}
        initialValues={{ title: "Test", content: "Re Test", post_image: "" }}
        validationSchema={postSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="add-post-box">
            <Field
              name="title"
              displayname="Titre"
              component={CustomInput}
              type="text"
            />
            <ErrorMessage name="title" component={CustomError} />
            <br />
            <Field
              as="textarea"
              name="content"
              displayname="Contenu"
              component={CustomInput}
              type="text"
            />
            <ErrorMessage name="content" component={CustomError} />
            <br />
            <label htmlFor="post_image">Image</label>
            <input
              id="post_image"
              type="file"
              name="post_image"
              accept=".png, .jpg, .jpeg"
              onChange={(event) => {
                console.log(event.currentTarget.files[0]);
                setFieldValue("post_image", event.currentTarget.files[0]);
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              Publier
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
