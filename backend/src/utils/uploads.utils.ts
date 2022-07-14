import * as fs from "fs";

export const createAvatarUrl = (
  file: any,
  protocol: string,
  host: string,
  avatarUrl: string
): string => {
  if (file) {
    deleteOldAvatarImgIfExist(file, avatarUrl);
    return `${protocol}://${host}/avatar/${file.filename}`;
  } else {
    deleteAvatarImgIfExist(file, avatarUrl);
    return "";
  }
};

const deleteOldAvatarImgIfExist = (file: any, avatarUrl: string) => {
  const filename = avatarUrl.split("/avatar/")[1];
  if (avatarUrl) fs.unlinkSync(`uploads/avatars/${filename}`);
};

export const deleteAvatarImgIfExist = (file: any, avatarUrl: string): void => {
  if (avatarUrl) deleteAvatarImgOnServer(file, avatarUrl);
};

const getAvatarFilename = (file: any | any, avatarUrl: string) => {
  return file ? file.filename : avatarUrl.split("/avatar/")[1];
};

export const deleteAvatarImgOnServer = (file: any, avatarUrl: string): void => {
  const filename = getAvatarFilename(file, avatarUrl);
  fs.unlinkSync(`uploads/avatars/${filename}`);
};

export const createPostImgUrl = (
  file: any,
  protocol: string,
  host: string
): string => {
  if (file) {
    return `${protocol}://${host}/post_image/${file.filename}`;
  } else {
    return "";
  }
};

const modifyPostImgUrl = (
  file: any,
  protocol: string,
  host: string
): string => {
  return `${protocol}://${host}/post_image/${file.filename}`;
};

export const deleteOldPostImageOnServer = (oldPostImgUrl: string) => {
  const filename = oldPostImgUrl.split("/post_image/")[1];
  fs.unlinkSync(`uploads/posts_images/${filename}`);
  return "";
};

export const deleteNewImageOnServer = (filename: string | any) => {
  fs.unlinkSync(`uploads/posts_images/${filename}`);
};

export const setPostImgUrl = (
  file: any,
  protocol: string,
  host: string,
  postImgUrl: string
): string => {
  if (!file) {
    return postImgUrl;
  } else if (file && !postImgUrl) {
    const postImgUrlToSend = createPostImgUrl(file, protocol, host);
    return postImgUrlToSend;
  } else {
    deleteOldPostImageOnServer(postImgUrl);
    const postImgUrlToSend = modifyPostImgUrl(file, protocol, host);
    return postImgUrlToSend;
  }
};
