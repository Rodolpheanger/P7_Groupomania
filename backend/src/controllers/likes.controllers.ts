import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import { serviceSetLike } from "./likes.services";

export const setLike = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file = req.file;
  const requestUserUid: string = req.requestUserUid;
  const postUid: string = req.params.id;
  const likeValue: number = req.body.value;
  try {
    const result = await serviceSetLike(
      file,
      requestUserUid,
      postUid,
      likeValue
    );
    if (result) res.status(201).json({ message: result });
  } catch (err) {
    console.log("test", err);
    errorResponse(err, res);
  }
};