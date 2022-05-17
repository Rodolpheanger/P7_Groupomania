import { Request, Response } from "express";
import {
  serviceCreatePost,
  serviceGetAllPosts,
  serviceGetOnePost,
  serviceGetPostsByAuthor,
} from "./post.services";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceCreatePost(req);
    result
      ? res.status(201).json({ message: "Post créé avec succès" })
      : res.status(400).json({ message: "Requête non conforme" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetAllPosts();
    data
      ? res.status(200).json(data)
      : res.status(400).json({ message: "Requête non conforme" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export const getOnePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetOnePost(req);
    data
      ? res.status(200).json({ data })
      : res.status(400).json({ message: "Requête non conforme" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export const getPostsByAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await serviceGetPostsByAuthor(req);
    data
      ? res.status(200).json({ data })
      : res.status(400).json({ message: "Requête non conforme" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};
