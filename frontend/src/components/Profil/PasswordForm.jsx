import { useContext, useState } from "react";
import * as axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import ClientErrorMessage from "../Form/ClientErrorMessage";
import TextInput from "../Form/TextInput";
import ServerErrorMessage from "../Form/ServerErrorMessage";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";
import { TokenContext } from "../../contexts/token.context";

const PasswordEditionForm = ({ close }) => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [token] = useContext(TokenContext);
  const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Ce champ est obligatoire")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),

    newPassword: Yup.string()
      .required("Ce champ est obligatoire")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Les mots de passe ne correspondent pas"
      )
      .required("Ce champ est obligatoire")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
  });

  const closeValidationModal = () => {
    setDisplayValidationModal(false);
    close();
  };

  const validationModal = displayValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={closeValidationModal}
      ></ValidationModal>
    </ModalWrapper>
  );

  const updatePassword = async (values) => {
    try {
      const response = await axios.put(`/api/users/password`, values, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setDisplayValidationModal(true);
      setResponseMessage(response.data.message);
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };
  return (
    <div className="password-edition-form">
      {validationModal}
      <Formik
        onSubmit={updatePassword}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
      >
        {() => (
          <Form>
            <Field
              name="oldPassword"
              displayname="Mot de passe actuel"
              component={TextInput}
              type="password"
              autoFocus={true}
            />
            <ErrorMessage name="oldPassword" component={ClientErrorMessage} />
            <br />
            <Field
              name="newPassword"
              displayname="Nouveau mot de passe"
              component={TextInput}
              type="password"
            />
            <ErrorMessage name="newPassword" component={ClientErrorMessage} />
            <br />
            <Field
              name="confirmPassword"
              displayname="Confirmer mot de passe"
              component={TextInput}
              type="password"
            />
            <ErrorMessage
              name="confirmPassword"
              component={ClientErrorMessage}
            />
            <ServerErrorMessage message={serverErrorMessage} />
            <br />
            <button className="btn btn-submit" type="submit">
              Modifier
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordEditionForm;
