import * as yup from "yup";

export const userSchema = yup.object().shape({
  uid: yup.string().uuid(),
  username: yup
    .string()
    .max(50, "Nom d'utilisateur trop long (50 caractères max)"),
  email: yup
    .string()
    .max(150, "Email trop long (150 caractères max)")
    .email("Format email non valide (exemple: nom.prenom@groupomania.fr)"),
  password: yup
    .string()
    .min(6, "Mot de passe trop court (8 caractères min)")
    .max(50, "Mot de passe trop long (50 caractères max)"),
  firstname: yup
    .string()
    .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
    .max(50, "Prénom trop long (50 caractères max)"),
  lastname: yup
    .string()
    .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
    .max(50, "Nom trop long (50 caractères max)"),
  bio: yup.string().max(255, "Bio trop longue (255 caractères max)"),
  role: yup
    .string()
    .matches(/user|admin/i, "Role non autorisé")
    .min(4)
    .max(15),
});
