import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const checkIfLikeExistAndGetDatas = (
  req: Request,
  postId: number,
  likeUserId: number
): any => {
  return new Promise((resolve, reject) => {
    const sqlCheckLikeAndGetDatas: string = `SELECT pl_id, pl_value, u_id FROM likes INNER JOIN posts ON pl_fk_post_id = ${postId} INNER JOIN users ON pl_fk_user_id = ${likeUserId}`;
    db.query(
      sqlCheckLikeAndGetDatas,
      (err: QueryError, rows: RowDataPacket[0]): any => {
        err
          ? (console.log(err), reject(Error("query error")))
          : rows.length === 0
          ? resolve(true)
          : //   TODO : faire le check ISOWNER ici !!!
            resolve(rows[0]);
      }
    );
  });
};

export const checkIfLikeUserIsOwner = (
  likeUserId: number,
  rows: RowDataPacket[0]
) => {
  const likeUser = likeUserId;
  const likeOwner = rows[0].u_id;
  likeUser === likeOwner ? true : false;
};
