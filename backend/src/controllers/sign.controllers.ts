import { Request, Response } from "express";
import { serviceSignup, serviceSignin } from "./sign.services";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSignup(req);
    result ? signin(req, res) : res.status(400).json({ message: result });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: any = await serviceSignin(req);
    result === "NoUser"
      ? res.status(200).json({ error: "Utilisateur non trouvé" })
      : result === "WrongPassword"
      ? res.status(401).json({ error: "Mot de passe incorrect !" })
      : res.status(200).json({
          message: "Connexion réussie",
          userUid: result.userUid,
          userIsAdmin: result.userIsAdmin,
          token: result.token,
        });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
