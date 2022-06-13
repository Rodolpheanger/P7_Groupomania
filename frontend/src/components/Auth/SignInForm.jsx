import React, { Fragment, useContext, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import * as axios from "axios";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import ServerErrorMessage from "../Form/ServerErrorMessage";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import TextInput from "../Form/TextInput";

const SignInForm = () => {
  const navigate = useNavigate();
  const [serverErrorMessage, setServerErrorMessage] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [message, setMessage] = useState("");
  const [, setToken] = useContext(AuthContext);
  const openModal = () => {
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
    navigate("/posts");
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
    actions.setSubmitting(false);
    try {
      const response = await axios.post("api/users/signin", values);
      const { userUid, userRole, token, message } = response.data;
      setToken(token);
      localStorage.setItem(
        "data",
        JSON.stringify({ userUid, userRole, token }),
        setMessage(message),
        openModal()
      );
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };
  const modal = displayModal && (
    <ModalWrapper close={closeModal}>
      <ValidationModal message={message} className="validation-modal" />
    </ModalWrapper>
  );

  return (
    <Fragment>
      {modal}
      <div className="sign-form">
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
                component={TextInput}
                type="email"
              />
              <ErrorMessage name="email" component={CustomError} />
              <br />
              <Field
                name="password"
                displayname="Mot de passe"
                component={TextInput}
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
              <ServerErrorMessage message={serverErrorMessage} />
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default SignInForm;
