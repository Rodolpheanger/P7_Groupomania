import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import { serviceSetLike } from "./likes.services";

export const setLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSetLike(req);
    if (result) res.status(201).json({ message: result });
  } catch (err) {
    console.log("test", err);
    errorResponse(err, res);
  }
};
