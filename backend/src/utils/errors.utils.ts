import { Response } from "express";
class ErrorToSend {
  code: number;
  message: string;
  constructor(code: any, message: any) {
    this.code = code;
    this.message = message;
  }
  sendError(res: any) {
    return res.status(this.code).json({ message: this.message });
  }
}

export const errorResponse = (err: any, res: Response) => {
  if (err.message) console.log("Error message in errors.utils: ", err.message);
  if (err.field) console.log("Error message in errors.utils: ", err.field);

  if (
    err.message.includes("unauthorized") ||
    err.message.includes("forbidden") ||
    err.message.includes("split")
  )
    return authErrors(err.message, res);

  if (
    (err.field && err.field.includes("avatar")) ||
    (err.field && err.field.includes("image")) ||
    err.message.includes("Multer")
  )
    return multerErrors(err.message, err.field, res);
  if (err.message.includes("no file")) return fileErrors(err.message, res);

  if (err.message.includes("ValidationError"))
    return validationErrors(err.message, res);

  if (err.message.includes("query")) return queryError(err.message, res);
  console.log("erreur: ", err.message);
  if (
    err.message.includes("email") ||
    err.message.includes("username") ||
    err.message.includes("password")
  )
    return signErrors(err.message, res);
  if (
    err.message.includes("user") ||
    err.message.includes("old") ||
    err.message.includes("passwords")
  )
    return userErrors(err.message, res);

  if (err.message.includes("post")) return postErrors(err.message, res);

  if (err.message.includes("comment")) return commentErrors(err.message, res);

  if (err.message.includes("unlink"))
    return internalServerError(err.message, res);
  else new ErrorToSend(500, "erreur inconnue").sendError(res);
};

const authErrors = (err: any, res: Response) => {
  if (err.includes("unauthorized") || err.includes("split"))
    new ErrorToSend(401, "Echec de l'authentification").sendError(res);

  if (err.includes("forbidden"))
    new ErrorToSend(403, "Requête non autorisée").sendError(res);
};

const multerErrors = (err: any, errField: any, res: Response) => {
  if (err.includes("File too large") && errField.includes("avatar"))
    new ErrorToSend(
      400,
      "Fichier trop volumineux (taille maximum autorisée: 1 Mo)"
    ).sendError(res);

  if (err.includes("File too large") && errField.includes("image"))
    new ErrorToSend(
      400,
      "Fichier trop volumineux (taille maximum autorisée: 2 Mo)"
    ).sendError(res);

  if (err.includes("unexpected file"))
    new ErrorToSend(
      400,
      "Type de fichier non pris en charge (jpg, jpeg et png uniquement"
    ).sendError(res);
};

const fileErrors = (err: any, res: Response) => {
  if (err.includes("no file"))
    new ErrorToSend(400, "Aucun fichier détécté").sendError(res);
};

const validationErrors = (err: any, res: Response) => {
  new ErrorToSend(400, err.split("r:")[1]).sendError(res);
};

const queryError = (err: any, res: Response) => {
  new ErrorToSend(500, "Erreur interne du serveur").sendError(res);
};

const signErrors = (err: any, res: Response) => {
  if (err.includes("username"))
    new ErrorToSend(
      400,
      `Pseudo '${err.split("'")[1]}' déjà enregistré`
    ).sendError(res);

  if (err.includes("email"))
    new ErrorToSend(
      400,
      `Email '${err.split("'")[1]}' déjà enregistré`
    ).sendError(res);

  if (err.includes("invalid password"))
    new ErrorToSend(400, "Mot de passe non valide").sendError(res);
};

const userErrors = (err: any, res: Response) => {
  if (err.includes("user not found"))
    new ErrorToSend(404, "Utilisateur non trouvé").sendError(res);
  if (err.includes("old"))
    new ErrorToSend(400, "Mot de passe actuel non valide").sendError(res);
  if (err.includes("passwords don't match"))
    new ErrorToSend(400, "Les mots de passe ne correspondent pas").sendError(
      res
    );
};

const postErrors = (err: any, res: Response) => {
  if (err.includes("not found"))
    new ErrorToSend(400, "Post non trouvé").sendError(res);
};
const commentErrors = (err: any, res: Response) => {
  if (err.includes("comment not found"))
    new ErrorToSend(404, "Commentaire non trouvé").sendError(res);
};
const internalServerError = (err: any, res: Response) => {
  new ErrorToSend(500, "Erreur interne du serveur").sendError(res);
};
