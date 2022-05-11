import { RowDataPacket } from "mysql2";
import { Request } from "express";
import bcrypt from "bcrypt";

export const hashPassword = (req: Request): Promise<string> => {
  return bcrypt.hash(req.body.password, 10);
};

export const checkPassword = (
  req: Request,
  rows: RowDataPacket[]
): Promise<boolean> => {
  return bcrypt.compare(req.body.password, rows[0].password);
};
