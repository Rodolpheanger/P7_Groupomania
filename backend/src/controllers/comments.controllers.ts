import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import {
  serviceCreateComment,
  serviceDeleteComment,
  serviceGetCommentsByPost,
  serviceModifyComment,
} from "./comments.services";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceCreateComment(req);
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
  try {
    const data = await serviceGetCommentsByPost(req);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const modifyComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceModifyComment(req);
    if (result)
      res.status(200).json({ message: "Commentaire modifié avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceDeleteComment(req);
    if (result)
      res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
