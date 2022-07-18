import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import { serviceSetLike, serviceGetLikeByPost } from "./likes.services";

export const getLikeByPost = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file = req.file;
  const postUid: string = req.params.id;
  try {
    const result = await serviceGetLikeByPost(file, postUid);
    res.status(200).json(result);
  } catch (err) {
    console.log("GetLikes error :", err);
    errorResponse(err, res);
  }
};

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
    errorResponse(err, res);
  }
};
