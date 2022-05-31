import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import {
  serviceDeleteUser,
  serviceGetOneUser,
  serviceGetAllUsers,
  serviceUpdateUser,
} from "./users.services";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await serviceGetAllUsers();
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const file: any = req.file;
  const userUid = req.params.id;
  try {
    const data = await serviceGetOneUser(file, userUid);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const userUid = req.params.id;
  const { username, email, password, firstname, lastname, bio } = req.body;
  try {
    const result = await serviceUpdateUser(
      file,
      userUid,
      username,
      email,
      password,
      firstname,
      lastname,
      bio
    );
    if (result)
      res.status(200).json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const userUid: string = req.params.id;

  try {
    const result = await serviceDeleteUser(file, userUid);
    if (result)
      res.status(200).json({
        message: "Utilisateur supprimé avec succès",
      });
  } catch (err) {
    errorResponse(err, res);
  }
};
