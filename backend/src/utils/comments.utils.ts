import { RowDataPacket } from "mysql2";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { checkIfPostExistAndGetDatas } from "./posts.utils";
import { checkIfUserExistAndGetDatas } from "./users.utils";

export const checkIfCommentExistAndGetDatas = (
  commentUid: string
): Promise<QueryError | RowDataPacket[0]> => {
  return new Promise((resolve, reject): any => {
    const sql: string =
      "SELECT c_id, p_uid, u_uid FROM comments INNER JOIN posts ON c_fk_post_id = p_id INNER JOIN users ON c_fk_user_id = u_id WHERE c_uid = ?";
    const value: any = [commentUid];
    db.execute(
      sql,
      value,
      (err: QueryError | null, rows: RowDataPacket[]): void | any => {
        err
          ? (console.log(err), reject(Error("query error")))
          : rows.length === 0
          ? (console.log(err), reject(Error("comment not found")))
          : resolve(rows[0]);
      }
    );
  });
};

export const checkIfUserIsCommentOwnerAndGetDatas = async (
  file: any,
  commentUid: string
): Promise<{ commentId: any; commentOwner: any }> => {
  const commentDatas = await checkIfCommentExistAndGetDatas(commentUid);
  const commentId = commentDatas.c_id;
  await checkIfPostExistAndGetDatas(file, commentDatas.p_uid);
  const userDatas = await checkIfUserExistAndGetDatas(file, commentDatas.u_uid);
  const commentOwner = userDatas.u_uid;
  return { commentId, commentOwner };
};
