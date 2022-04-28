import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import * as axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format de l'email invalide")
      .required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(6, "Votre mot de passe doit comporter au moins 6 caractères")
      .required("Ce champ est obligatoire"),
  });

  const submit = (values, actions) => {
    actions.setSubmitting(false);
    navigate("/posts");
  };

  return (
    <div>
      <Formik
        onSubmit={submit}
        initialValues={{ email: "", password: "" }}
        validationSchema={UserSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              displayname="Email"
              component={CustomInput}
              type="email"
            />
            <ErrorMessage name="email" component={CustomError} />
            <br />
            <Field
              name="password"
              displayname="Mot de passe"
              component={CustomInput}
              type="password"
            />
            <ErrorMessage name="password" component={CustomError} />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Connexion
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
