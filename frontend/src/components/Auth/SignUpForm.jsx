import { Fragment, useState } from "react";
import * as axios from "axios";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import TextInput from "../Form/TextInput.jsx";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import ClientErrorMessage from "../Form/ClientErrorMessage";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const SignupForm = ({ setSignInCard, setSignUpCard, setForgetPassword }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [message, setMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
    setSignInCard(true);
    setSignUpCard(false);
    setForgetPassword(true);
  };

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
      .required("Ce champ est obligatoire")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
  });

  const submit = async (values) => {
    try {
      const response = await axios.post("/api/users/signup", values);
      const message = response.data.message;
      setMessage(message);
      openModal();
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };
  const modal = displayModal && (
    <ModalWrapper>
      <ValidationModal
        message={
          <Fragment>
            <p>{message}</p>
            <br />
            <p>Veuillez vous connecter</p>
          </Fragment>
        }
        className="validation-modal"
        close={closeModal}
      />
    </ModalWrapper>
  );

  return (
    <Fragment>
      {modal}

      <div className="sign-form">
        <Formik
          onSubmit={submit}
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={UserSchema}
        >
          {() => (
            <Form>
              <Field
                name="username"
                displayname="Pseudo"
                component={TextInput}
                type="text"
              />
              <ErrorMessage name="username" component={ClientErrorMessage} />
              <br />
              <Field
                name="email"
                displayname="Email"
                component={TextInput}
                type="email"
              />
              <ErrorMessage name="email" component={ClientErrorMessage} />
              <br />
              <Field
                name="password"
                displayname="Mot de passe"
                component={TextInput}
                type="password"
              />
              <ErrorMessage name="password" component={ClientErrorMessage} />
              <br />
              <ServerErrorMessage message={serverErrorMessage} />
              <button className="btn btn-submit" type="submit">
                Inscription
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default SignupForm;
