import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomError from "../Form/ErrorMessage";
import TextInput from "../Form/TextInput";
import ServerErrorMessage from "../Form/ServerErrorMessage";
import { useContext, useState } from "react";
import { TokenContext } from "../../contexts/token.context";
import * as axios from "axios";
import ModalWrapper from "../Modals/ModalWrapper";
import ValidationModal from "../Modals/ValidationModal";

const PasswordEditionForm = ({ close }) => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [displayValidationModal, setDisplayValidationModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [token] = useContext(TokenContext);
  const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Votre mot de passe doit comporter au moins 8 caractères")
      .max(50, "Votre mot de passe ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
    newPassword: Yup.string()
      .min(8, "Votre mot de passe doit comporter au moins 8 caractères")
      .max(50, "Votre mot de passe ne doit pas comporter plus de 50 caractères")
      .required("Ce champ est obligatoire"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Les mots de passe ne correspondent pas"
      )
      .required("Ce champ est obligatoire"),
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
            <ErrorMessage name="oldPassword" component={CustomError} />
            <br />
            <Field
              name="newPassword"
              displayname="Nouveau mot de passe"
              component={TextInput}
              type="password"
            />
            <ErrorMessage name="newPassword" component={CustomError} />
            <br />
            <Field
              name="confirmPassword"
              displayname="Confirmer mot de passe"
              component={TextInput}
              type="password"
            />
            <ErrorMessage name="confirmPassword" component={CustomError} />
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
