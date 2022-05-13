import { Request, Response, NextFunction } from "express";
import { userSchema } from "../models/users.models";

const errorMessage = (res: Response) => {
  return res.status(400).json({ message: "Format des données non valide !" });
};

export const userValidity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = await userSchema.isValid(req.body);
  isValid ? next() : errorMessage(res);
};
