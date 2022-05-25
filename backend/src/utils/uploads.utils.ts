import { Request } from "express";
import * as fs from "fs";

export const createAvatarUrl = (
  req: Request | any,
  avatarUrl: string
): string => {
  if (req.file) {
    return `${req.protocol}://${req.get("host")}/uploads/avatars/${
      req.file.filename
    }`;
  } else {
    deleteAvatarImgIfExist(req, avatarUrl);
    return "";
  }
};

export const deleteAvatarImgIfExist = (
  req: Request,
  avatarUrl: string
): void => {
  if (avatarUrl) deleteAvatarImgOnServer(req, avatarUrl);
};

const getAvatarFilename = (req: Request | any, avatarUrl: string) => {
  return req.file ? req.file.filename : avatarUrl.split("/avatars/")[1];
};

export const deleteAvatarImgOnServer = (
  req: Request,
  avatarUrl: string
): void => {
  const filename = getAvatarFilename(req, avatarUrl);
  fs.unlinkSync(`uploads/avatars/${filename}`);
};

export const createPostImgUrl = (req: Request): string => {
  if (req.file) {
    return `${req.protocol}://${req.get("host")}/uploads/posts_images/${
      req.file.filename
    }`;
  } else {
    return "";
  }
};

const modifyPostImgUrl = (req: Request | any): string => {
  return `${req.protocol}://${req.get("host")}/uploads/posts_images/${
    req.file.filename
  }`;
};

export const deleteOldPostImageOnServer = (oldPostImgUrl: string) => {
  const filename = oldPostImgUrl.split("/posts_images/")[1];
  fs.unlinkSync(`uploads/posts_images/${filename}`);
};

export const deleteNewImageOnServer = (req: Request | any) => {
  fs.unlinkSync(`uploads/posts_images/${req.file.filename}`);
};

export const setPostImgUrl = (
  req: Request | any,
  oldPostImgUrl: string
): string => {
  if (!req.file) {
    return oldPostImgUrl;
  } else if (req.file && !oldPostImgUrl) {
    const postImgUrl = createPostImgUrl(req);
    return postImgUrl;
  } else {
    deleteOldPostImageOnServer(oldPostImgUrl);
    const newPostImgUrl = modifyPostImgUrl(req);
    return newPostImgUrl;
  }
};
