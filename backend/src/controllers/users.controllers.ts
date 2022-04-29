import { Request, Response } from "express";
import {
  reqDeleteUser,
  reqGetUser,
  reqGetUsers,
  reqUpdateUser,
} from "./users.services";

export const getUsers = (req: Request, res: Response): void => {
  reqGetUsers(req, res);
};

export const getUser = (req: Request, res: Response): void => {
  reqGetUser(req, res);
};

export const updateUser = (req: Request, res: Response): void => {
  reqUpdateUser(req, res);
};

export const deleteUser = (req: Request, res: Response): void => {
  reqDeleteUser(req, res);
};
