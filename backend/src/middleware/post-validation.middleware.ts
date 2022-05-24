import { errorResponse } from "./../utils/errors.utils";
import { Request, Response, NextFunction } from "express";
import { postSchema } from "../models/posts.models";

export const postValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await postSchema.validate(req.body).catch((err) => {
      throw new Error(err);
    });
    if (isValid) next();
  } catch (err: any) {
    errorResponse(err, res);
  }
};
