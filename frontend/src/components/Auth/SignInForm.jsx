import React, { Fragment, useContext, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import CustomInput from "../Form/FormInput";
import CustomError from "../Form/ErrorInput";
import * as Yup from "yup";
import * as axios from "axios";
import Modal from "../Modals/Modal";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

// TODO gérer l'affichage des erreurs remontées par le back et la modale de connexion réussie

const SignInForm = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(false);
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
      setErrMsg(err.response.data.message);
    }
  };
  const modal = displayModal && (
    <Modal message={message} className="validation-modal" close={closeModal} />
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
