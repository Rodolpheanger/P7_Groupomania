import * as Yup from "yup";
import * as axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomError from "../Form/ErrorMessage";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TexteArea";
import { useContext } from "react";
import { TokenContext } from "../../contexts/token.context";

const ProfilBodyForm = ({
  userUid,
  username,
  email,
  firstname,
  lastname,
  bio,
}) => {
  const [token] = useContext(TokenContext);
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
    console.log(values);
    try {
      const response = await axios.put(`/api/users/${userUid}`, values, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profil-body-form">
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
        {({ isSubmitting }) => (
          <Form className="profil-body-form-card">
            <Field
              name="username"
              displayname="Pseudo"
              component={TextInput}
              type="text"
              className="profil-body-form-username"
            />
            <ErrorMessage name="username" component={CustomError} />
            <Field
              name="email"
              displayname="Email"
              component={TextInput}
              type="text"
              className="profil-body-form-email"
            />
            <ErrorMessage name="email" component={CustomError} />
            <Field
              name="firstname"
              displayname="Prénom"
              component={TextInput}
              type="text"
              className="profil-body-form-firstname"
            />
            <ErrorMessage name="firstname" component={CustomError} />
            <Field
              name="lastname"
              displayname="Nom"
              component={TextInput}
              type="text"
              className="profil-body-form-lastname"
            />
            <ErrorMessage name="lastname" component={CustomError} />
            <br />
            <Field name="bio" displayname="Bio" component={TextArea} rows="5" />
            <ErrorMessage name="bio" component={CustomError} />
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn profil-body-form-button"
            >
              Valider
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfilBodyForm;
