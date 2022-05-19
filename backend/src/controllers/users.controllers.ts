import { Request, Response } from "express";
import {
  serviceDeleteUser,
  serviceGetOneUser,
  serviceGetAllUsers,
  serviceUpdateUser,
} from "./users.services";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await serviceGetAllUsers();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await serviceGetOneUser(req);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceUpdateUser(req);
    result === "Forbidden"
      ? res.status(403).json({ message: "Requête non autorisée" })
      : result
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
    const result = await serviceDeleteUser(req);
    result === "Forbidden"
      ? res.status(403).json({ message: "Requête non autorisée" })
      : result
      ? res.status(200).json({
          message: "Utilisateur supprimé avec succès",
        })
      : res.status(404).json({ message: "Utilisateur non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
