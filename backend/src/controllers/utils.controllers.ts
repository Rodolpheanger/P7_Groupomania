import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const hashPassword = (req: Request): Promise<string> => {
  return bcrypt.hash(req.body.password, 10);
};
