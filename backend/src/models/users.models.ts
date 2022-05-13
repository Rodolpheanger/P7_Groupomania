import * as yup from "yup";

export const userSchema = yup.object({
  uuid: yup.string(),
  username: yup.string().max(50, "Nom d'utilisateur trop long"),
  email: yup
    .string()
    .max(150, "Email trop long")
    .email("Format email non valide"),
  password: yup.string().max(255),
  firstname: yup.string().max(50, "Prénom trop long (caractères max 50)"),
  lastname: yup.string().max(50, "Nom trop long (caractères max 50)"),
  bio: yup.string().max(500, "Bio trop longue (caractères max 500)"),
  profil_picture_url: yup
    .string()
    .max(255, "Nom d'image trop long (caractères max 255)"),
  inscription_date: yup.date(),
  admin: yup.number().integer().min(0).max(1),
});
