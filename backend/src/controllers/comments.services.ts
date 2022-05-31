import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserIsCommentOwnerAndGetDatas } from "../utils/comments.utils";
import { checkIfPostExistAndGetDatas } from "../utils/posts.utils";
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
    const sqlCreateComment: string = `INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), '${content}',' ${commentUserId}', '${postId}')`;
    db.query(sqlCreateComment, (err: QueryError) => {
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
    const sqlGetCommentsByPost: string = `SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = '${postId}' ORDER BY c_creation_date`;
    db.query(sqlGetCommentsByPost, (err: QueryError, rows: RowDataPacket[]) => {
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
      const sqlModifyComment: string = `UPDATE comments SET c_content = '${content}' WHERE c_id = ${commentId}`;
      db.query(sqlModifyComment, (err: QueryError) => {
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
  const { commentId, commentOwner } = datas;
  if (commentOwner === requestUserUid) {
    return new Promise((resolve, reject) => {
      const sqlDeleteComment: string = `DELETE FROM comments WHERE c_id = ${commentId}`;
      db.query(sqlDeleteComment, (err: QueryError) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};
