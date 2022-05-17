import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface Payload {
  userUid: string;
  userIsAdmin: boolean;
}

export const createToken = (u_uid: string, u_isadmin: boolean) => {
  const payload: Payload = {
    userUid: u_uid,
    userIsAdmin: u_isadmin,
  };
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
  const userUid: string = decodedToken.userUid;
  return userUid;
};
