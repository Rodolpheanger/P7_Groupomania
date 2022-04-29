import { Request, Response } from "express";
import { addUser, logUser } from "./sign.services";
import { hashPassword } from "./utils.controllers";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = await hashPassword(req);
    addUser(req, res, hashedPassword);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    logUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
