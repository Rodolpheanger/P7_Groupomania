import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserIsCommentOwnerAndGetDatas } from "../utils/comments.utils";
import { checkIfPostExistAndGetDatas } from "../utils/posts.utils";
import { checkUserRole } from "../utils/user-role.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceCreateComment = async (
  file: any,
  requestUserUid: string,
  content: string,
  postUid: string
): Promise<QueryError | boolean> => {
  const postDatas = await checkIfPostExistAndGetDatas(file, postUid);
  const postId = postDatas.p_id;
  const commentUserData = await checkIfUserExistAndGetDatas(
    file,
    requestUserUid
  );
  const commentUserId = commentUserData.u_id;
  return new Promise((resolve, reject) => {
    const sql: string =
      "INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), ?, ?, ?)";
    const values: any = [content, commentUserId, postId];
    db.execute(sql, values, (err: QueryError | null) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(true);
    });
  });
};

export const serviceGetCommentsByPost = async (
  file: any,
  postUid: string
): Promise<QueryError | RowDataPacket[]> => {
  const postDatas = await checkIfPostExistAndGetDatas(file, postUid);
  const postId = postDatas.p_id;
  return new Promise((resolve, reject) => {
    const sql: string =
      "SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = ? ORDER BY c_creation_date";
    const value: any = [postId];
    db.execute(sql, value, (err: QueryError | null, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceModifyComment = async (
  file: any,
  requestUserUid: string,
  commentUid: string,
  content: string
): Promise<QueryError | RowDataPacket[0]> => {
  const datas = await checkIfUserIsCommentOwnerAndGetDatas(file, commentUid);
  const { commentId, commentOwner } = datas;
  if (commentOwner === requestUserUid) {
    return new Promise((resolve, reject) => {
      const sql: string = "UPDATE comments SET c_content = ? WHERE c_id = ?";
      const values: any = [content, commentId];
      db.execute(sql, values, (err: QueryError | null) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};

export const serviceDeleteComment = async (
  file: any,
  requestUserUid: string,
  commentUid: string
): Promise<QueryError | boolean> => {
  const datas = await checkIfUserIsCommentOwnerAndGetDatas(file, commentUid);
  const userRole: string = await checkUserRole(requestUserUid);
  const { commentId, commentOwner } = datas;
  if (commentOwner === requestUserUid || userRole === "admin") {
    return new Promise((resolve, reject) => {
      const sql: string = "DELETE FROM comments WHERE c_id = ?";
      const value: any = [commentId];
      db.execute(sql, value, (err: QueryError | null) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};
