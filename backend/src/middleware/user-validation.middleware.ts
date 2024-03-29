import { errorResponse } from "./../utils/errors.utils";
import { Request, Response, NextFunction } from "express";
import { userSchema } from "../models/user.model";

export const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await userSchema.validate(req.body).catch((err) => {
      throw new Error(err);
    });
    if (isValid) next();
  } catch (err: any) {
    errorResponse(err, res);
  }
};
