import { Request } from "express";
import { RowDataPacket } from "mysql2";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { deletePostImageOnServer } from "./uploads.utils";

export const checkIfPostExistAndGetDatas = (
  req: Request,
  postId: string
): Promise<QueryError | boolean | any> => {
  return new Promise((resolve, reject) => {
    const sqlPost: string = `SELECT u_uid, p_post_img_url FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postId}'`;
    db.query(sqlPost, (err: QueryError, rows: RowDataPacket[]) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : rows.length === 0
        ? (deletePostImageOnServer(req, ""), reject(Error("post not found")))
        : resolve(rows[0]);
    });
  });
};
