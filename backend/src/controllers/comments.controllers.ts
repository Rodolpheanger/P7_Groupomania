import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import {
  serviceCreateComment,
  serviceDeleteComment,
  serviceGetCommentsByPost,
  serviceModifyComment,
} from "./comments.services";

export const createComment = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file = req.file;
  const userUid = req.userUid;
  const content = req.body.content;
  const postUid = req.params.id;
  try {
    const result = await serviceCreateComment(file, userUid, content, postUid);
    if (result)
      res.status(201).json({ message: "Commentaire ajouté avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const postUid: string = req.params.id;
  try {
    const data = await serviceGetCommentsByPost(file, postUid);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const modifyComment = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const userUid: string = req.userUid;

  const commentUid: string = req.params.id;
  const content: string = req.body.content;
  try {
    const result = await serviceModifyComment(
      file,
      userUid,
      commentUid,
      content
    );
    if (result)
      res.status(200).json({ message: "Commentaire modifié avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const deleteComment = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const userUid = req.userUid;
  const commentUid: string = req.params.id;

  try {
    const result = await serviceDeleteComment(file, userUid, commentUid);
    if (result)
      res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
