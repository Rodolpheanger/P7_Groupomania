import { NextFunction, Request, Response } from "express";
import { getUserUid } from "../utils/auth.utils";
import { errorResponse } from "../utils/errors.utils";

const auth = (req: Request | any, res: Response, next: NextFunction): void => {
  try {
    const { u_uid } = req.body;
    const userUid = getUserUid(req);
    req.userUid = userUid;
    if (u_uid && u_uid !== userUid) {
      throw Error("unauthorized");
    } else {
      next();
    }
  } catch (err: any) {
    console.log("log", err.message);
    errorResponse(err, res);
  }
};

export default auth;
