import { Request } from "express";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserExistAndGetData } from "../utils/user.utils";

export const serviceSetAvatarUrl = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const userUid = req.userUid;
  const avatarOwner = req.body.uid;
  const avatarUrl: string = `${req.protocol}://${req.get(
    "host"
  )}/uploads/avatars/${req.file.filename}`;

  try {
    const userExist = await checkIfUserExistAndGetData(avatarOwner, "u_uid");
    return !userExist
      ? false
      : userExist === userUid
      ? new Promise((resolve, reject) => {
          const reqSetAvatarUrl: string = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${userUid}"`;
          db.query(reqSetAvatarUrl, (err: QueryError) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const serviceSetPostImageUrl = async (
  req: Request | any
): Promise<QueryError | boolean> => {
  return new Promise((resolve, reject) => {
    const postImageUrl: string = `${req.protocol}://${req.get(
      "host"
    )}/frontend/public/uploads/images/${req.file.filename}`;
    const reqSetPostImageUrl: string = `UPDATE posts SET p_post_img_url = ${postImageUrl} WHERE p_uid = ${req.body.uid}`;
    db.query(reqSetPostImageUrl, (err: QueryError) => {
      err ? reject(err) : resolve(true);
    });
  });
};
