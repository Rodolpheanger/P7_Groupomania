import { NextFunction, Request, Response } from "express";
import { getUserUid } from "../utils/auth.utils";
import { errorResponse } from "../utils/errors.utils";

const auth = (req: Request | any, res: Response, next: NextFunction): void => {
  try {
    const u_uid: string = req.body.u_uid;
    const token: string = req.headers.authorization.split(" ")[1];
    const requestUserUid = getUserUid(token);
    req.requestUserUid = requestUserUid;
    if (u_uid && u_uid !== requestUserUid) {
      throw Error("unauthorized");
    } else {
      next();
    }
  } catch (err: any) {
    errorResponse(err, res);
  }
};

export default auth;
