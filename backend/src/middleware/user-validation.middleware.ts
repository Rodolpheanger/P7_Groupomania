import { Request, Response, NextFunction } from "express";
import { userSchema } from "../models/users.models";

export const userValidity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isValid: boolean = await userSchema.isValid(req.body);
  isValid
    ? next()
    : res.status(400).json({ message: "Format des données non valide !" });
};
