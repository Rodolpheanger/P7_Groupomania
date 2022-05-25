import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserIsOwner } from "../utils/comment.utils";
import { checkIfPostExistAndGetDatas } from "../utils/post.utils";
import { checkIfUserExistAndGetDatas } from "../utils/user.utils";

export const serviceCreateComment = async (
  req: Request | any
): Promise<QueryError | boolean> => {
  const userUid = req.userUid;
  const content = req.body.content;
  const postUid = req.params.id;
  const postDatas: any = await checkIfPostExistAndGetDatas(req, postUid);
  const postId = postDatas.p_id;
  const commentUserData = await checkIfUserExistAndGetDatas(req, userUid);
  const commentUserId = commentUserData.u_id;
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), '${content}',' ${commentUserId}', '${postId}')`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(true);
    });
  });
};

export const serviceGetCommentsByPost = async (
  req: Request
): Promise<QueryError | RowDataPacket[]> => {
  const postUid = req.params.id;
  const postDatas: any = await checkIfPostExistAndGetDatas(req, postUid);
  const postId = postDatas.p_id;
  return new Promise((resolve, reject) => {
    const sqlGetCommentsByPost: string = `SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = '${postId}' ORDER BY c_creation_date`;
    db.query(sqlGetCommentsByPost, (err: QueryError, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceModifyComment = async (
  req: Request | any
): Promise<QueryError | RowDataPacket[0]> => {
  const datas = await checkIfUserIsOwner(req);
  const { commentId, commentOwner } = datas;
  if (commentOwner === req.userUid) {
    return new Promise((resolve, reject) => {
      const sqlModifyComment: string = `UPDATE comments SET c_content = '${req.body.content}' WHERE c_id = ${commentId}`;
      db.query(sqlModifyComment, (err: QueryError) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};

export const serviceDeleteComment = async (
  req: Request | any
): Promise<QueryError | boolean> => {
  const datas = await checkIfUserIsOwner(req);
  const { commentId, commentOwner } = datas;
  if (commentOwner === req.userUid) {
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
