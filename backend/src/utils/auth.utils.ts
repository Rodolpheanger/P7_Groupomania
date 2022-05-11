import { Request } from "express";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface Payload {
  userId: string;
  isAdmin: boolean;
}

export const createToken = (rows: RowDataPacket[]): string => {
  const payload: Payload = {
    userId: rows[0].uid,
    isAdmin: rows[0].admin,
  };
  return jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, {
    expiresIn: "24h",
  });
};

const getToken = (req: Request): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
};

export const decodeToken: any = (req: Request) => {
  const token = getToken(req);
  return jwt.verify(token, `${process.env.JWT_SECRETKEY}`);
};
