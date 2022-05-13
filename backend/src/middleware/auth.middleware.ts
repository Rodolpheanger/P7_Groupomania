import { NextFunction, Request, Response } from "express";
import { getUserUid } from "../utils/auth.utils";

const auth = (req: Request | any, res: Response, next: NextFunction): void => {
  try {
    const uid = getUserUid(req);
    req.auth = uid;
    if (req.body.uid && req.body.uid !== uid) {
      throw "403 : Requête non autorisée !";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ err: err });
  }
};

export default auth;
