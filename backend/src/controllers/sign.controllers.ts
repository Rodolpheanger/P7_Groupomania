import { Request, Response } from "express";
import { addUser, logUser } from "./sign.services";

export const signup = (req: Request, res: Response): void => {
  try {
    addUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const login = (req: Request, res: Response): void => {
  try {
    logUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
