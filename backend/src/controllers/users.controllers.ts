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
    res.status(400).json({ message: err });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await reqGetUser(req, res);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
// res.status(404).json({ message: "Utilisateur non trouvé" });

export const updateUser = (req: Request, res: Response): void => {
  reqUpdateUser(req, res);
};

export const deleteUser = (req: Request, res: Response): void => {
  reqDeleteUser(req, res);
};
