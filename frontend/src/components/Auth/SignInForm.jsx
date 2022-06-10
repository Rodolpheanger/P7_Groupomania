import React, { Fragment, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import * as axios from "axios";
import Modal from "../Modals/Modal";
// import { useAuth } from "../../contexts/useAuth";
// import { useToken } from "../../utils/auth.utils";

// TODO gérer l'affichage des erreurs remontées par le back et la modale de connexion réussie

const SignInForm = () => {
  const [errMsg, setErrMsg] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [message, setMessage] = useState("");
  const showModal = () => {
    setDisplayModal(true);
  };
  const hideModal = () => {
    setDisplayModal(false);
  };

  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format de l'email invalide")
      .required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(8, "Votre mot de passe doit comporter au moins 8 caractères")
      .max(50, "Votre mot de passe ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
  });

  const submit = async (values, actions) => {
    console.log("SignIn");
    actions.setSubmitting(false);
    try {
      console.log("Try");
      const response = await axios.post("api/users/signin", values);
      const { userUid, userRole, token, message } = response.data;
      await localStorage.setItem(
        "data",
        JSON.stringify({ userUid, userRole, token }),
        console.log(response),
        // getToken(),
        // login(),
        setMessage(message),
        showModal()
      );
    } catch (err) {
      console.log(err);
      setErrMsg(err.response.data.message);
    }
  };
  const modal = displayModal && (
    <Modal
      message={message}
      className="ok-modal"
      close={hideModal}
      navigateTo="/posts"
    />
  );

  return (
    <Fragment>
      {modal}
      <div className="form-group">
        <Formik
          onSubmit={submit}
          initialValues={{ email: "", password: "" }}
          validationSchema={UserSchema}
        >
          {({ isSubmitting }) => (
            <Form>
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
                Connexion
              </button>
              {errMsg !== false && <p className="text-danger">{errMsg}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default SignInForm;
