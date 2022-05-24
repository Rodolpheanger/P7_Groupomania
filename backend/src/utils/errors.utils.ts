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
  ) {
    return authErrors(err, res);
  }
  if (
    (err.field && err.field.includes("avatar")) ||
    (err.field && err.field.includes("image")) ||
    err.message.includes("Multer")
  ) {
    return multerErrors(err, res);
  }
  if (err.message.includes("no file")) {
    return fileErrors(err, res);
  }
  if (err.message.includes("ValidationError")) {
    return validationErrors(err, res);
  }

  if (err.message.includes("query")) {
    return queryError(err, res);
  }
  if (
    err.message.includes("email") ||
    err.message.includes("username") ||
    err.message.includes("password")
  ) {
    return signErrors(err, res);
  }
  if (err.message.includes("user")) {
    return userErrors(err, res);
  }
  if (err.message.includes("post")) {
    return postErrors(err, res);
  }
  if (err.message.includes("unlink")) {
    return internalServerError(err, res);
  } else {
    new ErrorToSend(500, "erreur inconnue").sendError(res);
  }
};

const authErrors = (err: any, res: Response) => {
  if (err.message.includes("unauthorized") || err.message.includes("split")) {
    new ErrorToSend(401, "Echec de l'authentification").sendError(res);
  }
  if (err.message.includes("forbidden")) {
    new ErrorToSend(403, "Requête non autorisée").sendError(res);
  }
};

const multerErrors = (err: any, res: Response) => {
  if (err.message.includes("File too large") && err.field.includes("avatar")) {
    new ErrorToSend(
      400,
      "Fichier trop volumineux (taille maximum autorisée: 1 Mo)"
    ).sendError(res);
  }
  if (err.message.includes("File too large") && err.field.includes("image")) {
    new ErrorToSend(
      400,
      "Fichier trop volumineux (taille maximum autorisée: 2 Mo)"
    ).sendError(res);
  }
  if (err.message.includes("unexpected file")) {
    new ErrorToSend(
      400,
      "Type de fichier non pris en charge (jpg, jpeg et png uniquement"
    ).sendError(res);
  }
};

const fileErrors = (err: any, res: Response) => {
  if (err.message.includes("no file")) {
    new ErrorToSend(400, "Aucun fichier détécté").sendError(res);
  }
};

const validationErrors = (err: any, res: Response) => {
  new ErrorToSend(400, err.message.split(":")[1]).sendError(res);
};

const queryError = (err: any, res: Response) => {
  new ErrorToSend(500, "Erreur interne du serveur").sendError(res);
};

const signErrors = (err: any, res: Response) => {
  if (err.message.includes("username")) {
    new ErrorToSend(
      400,
      `Pseudo '${err.message.split("'")[1]}' déjà enregistré`
    ).sendError(res);
  }
  if (err.message.includes("email")) {
    new ErrorToSend(
      400,
      `Email '${err.message.split("'")[1]}' déjà enregistré`
    ).sendError(res);
  }
  if (err.message.includes("invalid password")) {
    new ErrorToSend(400, "Mot de passe non valide").sendError(res);
  }
};

const userErrors = (err: any, res: Response) => {
  if (err.message.includes("user not found")) {
    new ErrorToSend(404, "Utilisateur non trouvé").sendError(res);
  }
  if (err.message.includes("invalid password")) {
    new ErrorToSend(400, "Mot de passe non valide").sendError(res);
  }
};

const postErrors = (err: any, res: Response) => {
  if (err.message.includes("not found")) {
    new ErrorToSend(400, "Post non trouvé").sendError(res);
  }
};
const internalServerError = (err: any, res: Response) => {
  new ErrorToSend(500, "Erreur interne du serveur").sendError(res);
};
