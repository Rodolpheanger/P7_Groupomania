import { Request, Response } from "express";
import {
  serviceCreatePost,
  serviceDeletePost,
  serviceGetAllPosts,
  serviceGetOnePost,
  serviceGetPostsByAuthor,
  serviceUpdatePost,
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
    res.status(500).json({ message: "Test Erreur interne serveur" });
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

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceUpdatePost(req);
    result === "Forbidden"
      ? res.status(403).json({ message: "Requête non autorisée" })
      : result
      ? res.status(200).json({ message: "Post mis à jour avec succès" })
      : res.status(404).json({ message: "Post non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await serviceDeletePost(req);
    result === "Forbidden"
      ? res.status(403).json({ message: "Requête non autorisée" })
      : result
      ? res.status(200).json({ message: "Post supprimé avec succès" })
      : res.status(404).json({ message: "Post non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};
