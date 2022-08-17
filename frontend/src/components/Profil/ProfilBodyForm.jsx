import { Fragment, useContext, useState } from "react";
import * as axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TexteArea";
import ClientErrorMessage from "../Form/ClientErrorMessage";
import ServerErrorMessage from "../Form/ServerErrorMessage";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { TokenContext } from "../../contexts/token.context";
import { ReloadContext } from "../../contexts/reload.context";

const ProfilBodyForm = ({
  userUid,
  username,
  email,
  firstname,
  lastname,
  bio,
  close,
}) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [token] = useContext(TokenContext);
  const [reload, setReload] = useContext(ReloadContext);
  const ProfilBodySchema = Yup.object().shape({
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
    firstname: Yup.string()
      .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
      .max(50, "Prénom trop long (50 caractères max)"),
    lastname: Yup.string()
      .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
      .max(50, "Nom trop long (50 caractères max)"),
    bio: Yup.string().max(
      255,
      "Votre bio ne doit pas comporter plus de 255 caractères"
    ),
  });

  const submit = async (values) => {
    try {
      const response = await axios.put(`/api/users/${userUid}`, values, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setResponseMessage(response.data.message);
      setDisplayValidationModal(true);
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };

  const closeValidationModal = () => {
    close();
    setDisplayValidationModal(false);
    setReload(!reload);
  };

  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={closeValidationModal}
      ></ValidationModal>
    </ModalWrapper>
  );

  return (
    <Fragment>
      {validationModal}
      <article className="profil-body-form">
        <Formik
          onSubmit={submit}
          initialValues={{
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            bio: bio,
          }}
          validationSchema={ProfilBodySchema}
        >
          {() => (
            <Form className="profil-body-form-card">
              <Field
                name="username"
                displayname="Pseudo"
                component={TextInput}
                type="text"
                className="profil-body-form-username"
                autoFocus={true}
              />
              <ErrorMessage name="username" component={ClientErrorMessage} />
              <Field
                name="email"
                displayname="Email"
                component={TextInput}
                type="text"
                className="profil-body-form-email"
              />
              <ErrorMessage name="email" component={ClientErrorMessage} />
              <Field
                name="firstname"
                displayname="Prénom"
                component={TextInput}
                type="text"
                className="profil-body-form-firstname"
              />
              <ErrorMessage name="firstname" component={ClientErrorMessage} />
              <Field
                name="lastname"
                displayname="Nom"
                component={TextInput}
                type="text"
                className="profil-body-form-lastname"
              />
              <ErrorMessage name="lastname" component={ClientErrorMessage} />
              <br />
              <Field
                name="bio"
                displayname="Bio"
                currentCharCount={bio && bio.length}
                component={TextArea}
                rows="10"
              />
              <ErrorMessage name="bio" component={ClientErrorMessage} />
              <br />
              <ServerErrorMessage message={serverErrorMessage} />
              <button type="submit" className="btn profil-body-form-button">
                Valider
              </button>
            </Form>
          )}
        </Formik>
      </article>
    </Fragment>
  );
};

export default ProfilBodyForm;
