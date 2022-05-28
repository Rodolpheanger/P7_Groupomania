import { Request } from "express";
import { RowDataPacket } from "mysql2";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { deleteNewImageOnServer } from "./uploads.utils";

export const checkIfPostExistAndGetDatas = (
  req: Request,
  postUid: string
): Promise<QueryError | any> => {
  return new Promise((resolve, reject): any => {
    const sqlPost: string = `SELECT u_uid, p_post_img_url, p_id FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postUid}'`;
    db.query(sqlPost, (err: QueryError, rows: RowDataPacket[]): void | any => {
      err
        ? (console.log(err), reject(Error("query error")))
        : rows.length === 0 && req.file
        ? (deleteNewImageOnServer(req),
          console.log(err),
          reject(Error("post not found")))
        : rows.length === 0
        ? (console.log(err), reject(Error("post not found")))
        : resolve(rows[0]);
    });
  });
};

export const checkIfUserIsPostOwnerAndGetDatas = async (
  req: Request,
  postUid: string
) => {
  const postDatas = await checkIfPostExistAndGetDatas(req, postUid);
  const postOwner = postDatas.u_uid;
  const postId = postDatas.p_id;
  const postImgUrl = postDatas.p_post_img_url;
  return { postOwner, postId, postImgUrl };
};
