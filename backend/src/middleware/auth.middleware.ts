import { NextFunction, Request, Response } from "express";
import { getUserUid } from "../utils/auth.utils";

const auth = (req: Request | any, res: Response, next: NextFunction): void => {
  const { u_uid } = req.body;
  try {
    const userUid = getUserUid(req);
    req.userUid = userUid;
    if (u_uid && u_uid !== userUid) {
      throw "403 : Requête non autorisée !";
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: err });
  }
};

export default auth;
