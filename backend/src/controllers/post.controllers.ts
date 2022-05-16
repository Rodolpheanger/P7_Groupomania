import { Request, Response } from "express";
import { serviceCreatePost, serviceGetAllPosts } from "./post.services";

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
    const data = await serviceGetAllPosts(req);
    data
      ? res.status(200).json(data)
      : res.status(400).json({ message: "Requête non conforme" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};
