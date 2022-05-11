import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/auth.utils";

// TODO: finir ce bout de code

const auth = (req: any, res: Response, next: NextFunction): void => {
  try {
    const username = decodeToken.username;
    req.auth = { username };
  } catch {}
};

export default auth;
