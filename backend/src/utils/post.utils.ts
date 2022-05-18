import { RowDataPacket } from "mysql2";
import { QueryError } from "mysql2";
import { db } from "../../config/database";

export const checkIfPostExistAndGetOwner = (
  postId: string
): Promise<QueryError | boolean | any> => {
  return new Promise((resolve, reject) => {
    const sqlPost: string = `SELECT u_uid FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postId}'`;
    db.query(sqlPost, (err: QueryError, rows: RowDataPacket[]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? resolve(false)
        : resolve(rows[0].u_uid);
    });
  });
};
