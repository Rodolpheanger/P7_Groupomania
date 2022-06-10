import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import "../../config/axios-config.js";
import * as axios from "axios";
import { useNavigate } from "react-router-dom";

// TODO gérer l'affichage des erreurs remontées par le back et la modale de connexion réussie

const SignupForm = () => {
  const navigate = useNavigate();
  const UserSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Votre pseudo doit comporter au moins 3 caractères (max 15)")
      .max(
        15,
        "Votre pseudo ne doit pas comporter plus de 15 caractères (min 3)"
      )
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Format de l'email invalide")
      .required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(
        8,
        "Votre mot de passe doit comporter au moins 8 caractères (max 50)"
      )
      .max(
        50,
        "Votre mot de passe ne doit pas comporter plus de 50 caractères (min 8)"
      )
      .required("Ce champ est obligatoire"),
  });

  const submit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const response = await axios.post("/api/users/signup", values);
      console.log(response.data);
      navigate("/posts");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="form-group">
      <Formik
        onSubmit={submit}
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={UserSchema}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <button
              className="btn btn-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Inscription
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
