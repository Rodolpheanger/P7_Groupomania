import * as yup from "yup";

export const postSchema = yup.object().shape({
  uid: yup.string().uuid(),
  content: yup.string().max(500, "Contenu trop long (255 caractères max)"),
  title: yup.string().max(255, "Titre trop long (255 caractères max"),
  author: yup.string().uuid(),
});
