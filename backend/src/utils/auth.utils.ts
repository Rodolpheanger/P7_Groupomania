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

const decodeToken = (token: string) => {
  const decodedToken: string | JwtPayload = jwt.verify(
    token,
    `${process.env.JWT_SECRETKEY}`
  );
  return decodedToken;
};

export const getUserUid = (token: string): string => {
  const decodedToken: any = decodeToken(token);
  const userUid: string = decodedToken.userUid;
  return userUid;
};
