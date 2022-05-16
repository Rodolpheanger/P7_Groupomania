import { Request, Response } from "express";
import {
  reqDeleteUser,
  reqGetUser,
  reqGetUsers,
  reqUpdateUser,
} from "./users.services";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await reqGetUsers();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await reqGetUser(req);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
// res.status(404).json({ message: "Utilisateur non trouvé" });

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await reqUpdateUser(req);
    result
      ? res.status(200).json({ message: "Profil mis à jour avec succès" })
      : res.status(404).json({ message: "Utilisateur non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await reqDeleteUser(req);
    result === true
      ? res.status(200).json({
          message: "Utilisateur supprimé avec succès",
        })
      : result === false
      ? res.status(404).json({ message: "Utilisateur non trouvé" })
      : res.status(403).json({ message: "Requête non autorisée" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
