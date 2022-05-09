import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (req: Request): Promise<string> => {
  return bcrypt.hash(req.body.password, 10);
};

export const checkPassword = (req: Request, docs: any): Promise<boolean> => {
  return bcrypt.compare(req.body.password, docs[0].password);
};

export const createToken = (docs: any): string => {
  return jwt.sign({ userId: docs[0].id }, `${process.env.JWT_SECRETKEY}`, {
    expiresIn: "24h",
  });
};
