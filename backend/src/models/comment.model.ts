import * as yup from "yup";

export const commentSchema = yup.object().shape({
  content: yup.string().max(255, "Commentaire trop long (255 caractères max)"),
});
