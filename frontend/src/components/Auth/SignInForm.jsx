import React, { Fragment, useContext, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomError from "../Form/ErrorMessage";
import * as Yup from "yup";
import * as axios from "axios";
import { TokenContext } from "../../contexts/token.context";
import { UserRoleContext } from "../../contexts/userRole.context";
import { UserUidContext } from "../../contexts/userUid.context";
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
  const [, setToken] = useContext(TokenContext);
  const [, setUserRole] = useContext(UserRoleContext);
  const [, setUserUid] = useContext(UserUidContext);
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
      setUserRole(userRole);
      setUserUid(userUid);
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
  const validationModal = displayModal && (
    <ModalWrapper>
      <ValidationModal
        message={message}
        className="validation-modal"
        close={closeModal}
      />
    </ModalWrapper>
  );

  return (
    <Fragment>
      {validationModal}
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
              {serverErrorMessage && (
                <ServerErrorMessage message={serverErrorMessage} />
              )}
              <button
                className="btn btn-submit"
                type="submit"
                disabled={isSubmitting}
              >
                Connexion
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default SignInForm;
