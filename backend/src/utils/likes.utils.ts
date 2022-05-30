import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const checkIfLikeExistAndGetDatas = (
  postId: number,
  likeUserId: number
): any => {
  return new Promise((resolve, reject) => {
    const sqlCheckLikeAndGetDatas: string = `SELECT pl_id, pl_value, pl_fk_user_id FROM posts_likes JOIN posts ON pl_fk_post_id = ${postId} WHERE p_id = ${postId} AND pl_fk_user_id = ${likeUserId}`;
    db.query(
      sqlCheckLikeAndGetDatas,
      (err: QueryError, rows: RowDataPacket[0]): any => {
        err
          ? (console.log(err), reject(Error("query error")))
          : rows.length === 0
          ? resolve(false)
          : resolve(rows[0]);
      }
    );
  });
};
