import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import {
  serviceCreatePost,
  serviceDeletePost,
  serviceGetAllPosts,
  serviceGetOnePost,
  serviceGetPostsByAuthor,
  serviceUpdatePost,
} from "./posts.services";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceCreatePost(req);
    if (result) res.status(201).json({ message: "Post créé avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetAllPosts();
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getOnePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetOnePost(req);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getPostsByAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetPostsByAuthor(req);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceUpdatePost(req);
    if (result)
      res.status(200).json({ message: "Post mis à jour avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceDeletePost(req);
    if (result) res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
