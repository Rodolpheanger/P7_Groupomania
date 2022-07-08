import { Fragment } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomError from "../Form/ErrorMessage";
import TextInput from "../Form/TextInput";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const PasswordForm = () => {
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

  const updatePassword = async (values, actions) => {
    console.log(values);
  };
  const serverErrorMessage = "";

  return (
    <div className="password-edition-form">
      <Formik
        onSubmit={updatePassword}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="oldPassword"
              displayname="Mot de passe actuel"
              component={TextInput}
              type="password"
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
            <br />
            <button
              className="btn btn-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Modifier
            </button>
            <ServerErrorMessage message={serverErrorMessage} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordForm;
