import { Request } from "express";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { checkIfLikeExistAndGetDatas } from "../utils/likes.utils";
import { checkIfPostExistAndGetDatas } from "../utils/posts.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceSetLike = async (req: Request | any): Promise<any> => {
  const userUid = req.userUid;
  const postUid = req.params.id;
  const likeValue = req.body.value;
  const postDatas = await checkIfPostExistAndGetDatas(req, postUid);
  const postId = postDatas.p_id;
  const likeUserData = await checkIfUserExistAndGetDatas(req, userUid);
  const likeUserId = likeUserData.u_id;
  const likeDatas = await checkIfLikeExistAndGetDatas(req, postId, likeUserId);
  if (likeDatas === true) {
    serviceCreateLike(likeValue, likeUserId, postId);
  } else {
    const { likeId, oldLikeValue } = likeDatas;
    oldLikeValue === likeValue
      ? serviceDeleteLike(likeId)
      : serviceUpdateLike(likeId, likeValue);
  }
};

const serviceCreateLike = async (
  likeValue: number,
  likeUserId: number,
  postId: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `INSERT INTO likes (pl_value, pl_fk_user_id, pl_fk_post_id) VALUES (UUID(), '${likeValue}',' ${likeUserId}', '${postId}')`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("like create");
    });
  });
};
const serviceUpdateLike = async (
  likeId: number,
  likeValue: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `UPDATE likes SET pl_value = '${likeValue}' WHERE pl_id = ${likeId})`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("like update");
    });
  });
};

const serviceDeleteLike = async (
  likeId: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `DELETE likes WHERE pl_id = ${likeId})`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("like delete");
    });
  });
};
