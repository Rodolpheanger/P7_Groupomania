import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import "../../config/axios-config.js";
import * as axios from "axios";

const SignupForm = () => {
  const UserSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Votre pseudo doit comporter au moins 3 caractères (max 15)")
      .max(15, "Votre pseudo doit comporter au plus 15 caractères (min 3)")
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Format de l'email invalide")
      .required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(6, "Votre mot de passe doit comporter au moins 6 caractères")
      .required("Ce champ est obligatoire"),
  });

  const submit = async (values, actions) => {
    actions.setSubmitting(true);
    const res = await axios.post("/api/user/signup", values);
    console.log(res.data);
    // window.location = "/profil";
  };

  return (
    <div>
      <Formik
        onSubmit={submit}
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={UserSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="username"
              displayname="Pseudo"
              component={CustomInput}
            />
            <ErrorMessage name="username" component={CustomError} />
            <br />
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
              Inscription
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
