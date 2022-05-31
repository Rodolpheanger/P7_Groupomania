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
  req: Request | any,
  res: Response
): Promise<void> => {
  const file = req.file;
  const { content, title } = req.body;
  const userUid = req.userUid;
  const protocol = req.protocol;
  const host = req.get("host");
  try {
    if (
      req.headers["content-type"].includes("multipart") &&
      file === undefined
    ) {
      throw Error("no file");
    } else {
      const result = await serviceCreatePost(
        file,
        content,
        title,
        userUid,
        protocol,
        host
      );
      console.log(result);
      if (result) res.status(201).json({ message: "Post créé avec succès" });
    }
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
  const postUid: string = req.params.id;
  try {
    const data = await serviceGetOnePost(postUid);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const getPostsByAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authorUid = req.params.id;
  try {
    const data = await serviceGetPostsByAuthor(authorUid);
    if (data) res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
};

export const updatePost = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const postUid: string = req.params.id;
  const { content, title }: { content: string; title: string } = req.body;
  const userUid: string = req.userUid;
  const protocol = req.protocol;
  const host = req.get("host");
  try {
    if (
      req.headers["content-type"].includes("multipart") &&
      file === undefined
    ) {
      throw Error("no file");
    } else {
      const result = await serviceUpdatePost(
        file,
        postUid,
        content,
        title,
        userUid,
        protocol,
        host
      );
      if (result)
        res.status(200).json({ message: "Post mis à jour avec succès" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
};

export const deletePost = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file = req.file;
  const postUid: string = req.params.id;
  const userUid: string = req.userUid;
  try {
    const result = await serviceDeletePost(file, postUid, userUid);
    if (result) res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
