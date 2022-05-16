import { Request, Response } from "express";
import { addUser, logUser } from "./sign.services";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await addUser(req);
    result ? signin(req, res) : res.status(400).json({ message: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await logUser(req);
    console.log(result);
    result === "NoUser"
      ? res.status(404).json({ message: "Utilisateur non trouvé" })
      : result === "WrongPassword"
      ? res.status(401).json({ error: "Mot de passe incorrect !" })
      : res.status(200).json({
          message: "Connexion réussie",
          uid: result.uid,
          token: result.token,
        });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
