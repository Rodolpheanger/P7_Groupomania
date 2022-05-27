import { errorResponse } from "../utils/errors.utils";
import { Request, Response, NextFunction } from "express";
import { commentSchema } from "../models/comment.model";

export const commentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await commentSchema.validate(req.body).catch((err) => {
      throw new Error(err);
    });
    if (isValid) next();
  } catch (err: any) {
    errorResponse(err, res);
  }
};
