import * as yup from "yup";

export const likeSchema = yup.object().shape({
  value: yup
    .number()
    .integer()
    .min(0, "Valeur du like invalide (0, 1 ou 2 uniquement)")
    .max(2, "Valeur du like invalide (0, 1 ou 2 uniquement)"),
});
