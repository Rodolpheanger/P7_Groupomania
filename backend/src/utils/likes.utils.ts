import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const checkIfLikeExistAndGetDatas = (
  postId: number,
  likeUserId: number
): any => {
  return new Promise((resolve, reject) => {
    const sql: string =
      "SELECT pl_id, pl_value, pl_fk_user_id FROM posts_likes JOIN posts ON pl_fk_post_id = ? WHERE p_id = ? AND pl_fk_user_id = ?";
    const value: any = [postId, postId, likeUserId];
    db.execute(
      sql,
      value,
      (err: QueryError | null, rows: RowDataPacket[0]): any => {
        err
          ? (console.log(err), reject(Error("query error")))
          : rows.length === 0
          ? resolve(false)
          : resolve(rows[0]);
      }
    );
  });
};
