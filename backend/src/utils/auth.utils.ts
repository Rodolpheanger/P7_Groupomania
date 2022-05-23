import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload {
  userUid: string;
  userRole: boolean;
}

export const createToken = (u_uid: string, u_role: boolean) => {
  const payload: Payload = {
    userUid: u_uid,
    userRole: u_role,
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
