import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface Payload {
  uid: string;
  isAdmin: boolean;
}

export const createToken = (
  rows: RowDataPacket[] | { uid: string; admin: number }[]
) => {
  const payload: Payload = {
    uid: rows[0].uid,
    isAdmin: rows[0].admin,
  };
  console.log("log uid dans createToken :", payload.uid);
  return jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, {
    expiresIn: "24h",
  });
};

const getToken = (req: Request | any): string => {
  const token: string = req.headers.authorization.split(" ")[1];
  return token;
};

const decodeToken = (req: Request) => {
  const token: string = getToken(req);
  const decodedToken: string | JwtPayload = jwt.verify(
    token,
    `${process.env.JWT_SECRETKEY}`
  );
  return decodedToken;
};

export const getUserUid = (req: Request): string => {
  const decodedToken: any = decodeToken(req);
  const uid: string = decodedToken.uid;
  return uid;
};
