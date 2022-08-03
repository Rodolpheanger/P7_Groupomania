import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfLikeExistAndGetDatas } from "../utils/likes.utils";
import { checkIfPostExistAndGetDatas } from "../utils/posts.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceGetLikesByPost = async (
  file: any,
  postUid: string
): Promise<QueryError | RowDataPacket[]> => {
  const postDatas = await checkIfPostExistAndGetDatas(file, postUid);
  const postId = postDatas.p_id;
  return new Promise((resolve, reject) => {
    const sql: string =
      "SELECT pl_value, u_uid, pl_fk_post_id FROM posts_likes INNER JOIN users ON pl_fk_user_id = u_id WHERE pl_fk_post_id = ?";
    const value: any = [postId];
    db.execute(sql, value, (err: QueryError | null, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceSetLike = async (
  file: any,
  requestUserUid: string,
  postUid: string,
  likeValue: number
): Promise<any> => {
  const postDatas = await checkIfPostExistAndGetDatas(file, postUid);
  const postId = postDatas.p_id;
  const likeUserData = await checkIfUserExistAndGetDatas(file, requestUserUid);
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
    const sql: string =
      "INSERT INTO posts_likes (pl_value, pl_fk_user_id, pl_fk_post_id) VALUES (?, ?, ?)";
    const values: any = [likeValue, likeUserId, postId];
    db.execute(sql, values, (err: QueryError | null) => {
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
    const sql: string = "UPDATE posts_likes SET pl_value = ? WHERE pl_id = ?";
    const values: any = [likeValue, likeId];
    db.execute(sql, values, (err: QueryError | null) => {
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
    const sql: string = "DELETE FROM posts_likes WHERE pl_id = ?";
    const value: any = [likeId];
    db.execute(sql, value, (err: QueryError | null) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve("Like supprimé avec succès");
    });
  });
};
