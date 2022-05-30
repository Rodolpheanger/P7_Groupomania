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
  const likeDatas = await checkIfLikeExistAndGetDatas(postId, likeUserId);
  if (likeDatas === false) {
    const result = await serviceCreateLike(likeValue, likeUserId, postId);
    return result;
  } else {
    const likeId = likeDatas.pl_id;
    const oldLikeValue = likeDatas.pl_value;
    return oldLikeValue === likeValue
      ? await serviceDeleteLike(likeId)
      : await serviceUpdateLike(likeId, likeValue);
  }
};

const serviceCreateLike = (
  likeValue: number,
  likeUserId: number,
  postId: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `INSERT INTO posts_likes (pl_value, pl_fk_user_id, pl_fk_post_id) VALUES ('${likeValue}',' ${likeUserId}', '${postId}')`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("Like créé avec succès");
    });
  });
};
const serviceUpdateLike = (
  likeId: number,
  likeValue: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `UPDATE posts_likes SET pl_value = ${likeValue} WHERE pl_id = ${likeId}`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("Like mise à jour avec succès");
    });
  });
};

const serviceDeleteLike = async (
  likeId: number
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlCreateComment: string = `DELETE FROM posts_likes WHERE pl_id = ${likeId}`;
    db.query(sqlCreateComment, (err: QueryError) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("Like supprimé avec succès");
    });
  });
};
