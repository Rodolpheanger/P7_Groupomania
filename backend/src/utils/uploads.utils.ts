import { req, Request } from "express";
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
  avatarUrl ? deleteAvatarImgOnServer(req, avatarUrl) : true;
};

const deleteAvatarImgOnServer = (req: Request, avatarUrl: string): void => {
  const filename = avatarUrl.split("/avatars/")[1];
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

const getFilename = (req: Request | any, oldPostImgUrl: string) => {
  if (req.file) {
    return req.file.filename;
  } else {
    return oldPostImgUrl.split("/posts_images/")[1];
  }
};

export const deletePostImageOnServer = (
  req: Request | any,
  oldPostImgUrl: string
) => {
  const filename = getFilename(req, oldPostImgUrl);
  fs.unlinkSync(`uploads/posts_images/${filename}`);
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
    deletePostImageOnServer(req, oldPostImgUrl);
    const newPostImgUrl = modifyPostImgUrl(req);
    return newPostImgUrl;
  }
};
