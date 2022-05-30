import { errorResponse } from "../utils/errors.utils";
import { Request, Response, NextFunction } from "express";
import { likeSchema } from "../models/like.model";

export const likeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await likeSchema.validate(req.body).catch((err) => {
      throw new Error(err);
    });
    if (isValid) next();
  } catch (err: any) {
    errorResponse(err, res);
  }
};
