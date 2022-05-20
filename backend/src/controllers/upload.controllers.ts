import { Request, Response } from "express";
import { serviceSetAvatarUrl } from "./upload.services";

export const setAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSetAvatarUrl(req);
    result === "Forbidden"
      ? res.status(403).json({ message: "Requête non autorisée" })
      : result
      ? res.status(200).json({ message: "Avatar modifié avec succès" })
      : res.status(404).json({ message: "Utilisateur non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
