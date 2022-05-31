import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserIsPostOwnerAndGetDatas } from "../utils/posts.utils";
import {
  deleteOldPostImageOnServer,
  createPostImgUrl,
  setPostImgUrl,
  deleteNewImageOnServer,
} from "../utils/uploads.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceCreatePost = async (
  file: any,
  content: string,
  title: string,
  userUid: string,
  protocol: string,
  host: string
): Promise<QueryError | boolean | unknown> => {
  const postImgUrl = createPostImgUrl(file, protocol, host);
  const userDatas = await checkIfUserExistAndGetDatas(file, userUid);
  const userId = userDatas.u_id;
  return new Promise((resolve, reject) => {
    const reqCreatePost: string = `INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_fk_user_id) VALUES (UUID(), "${content}", "${postImgUrl}", NOW(), "${title}", ${userId}) `;
    db.query(reqCreatePost, (err: QueryError) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(true);
    });
  });
};

export const serviceGetAllPosts = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const reqGetAllPosts: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id =  u_id ORDER BY p_creation_date DESC`;
    db.query(reqGetAllPosts, (err: QueryError, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceGetOnePost = (
  postUid: string
): Promise<QueryError | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const reqGetOnePost: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = "${postUid}"`;
    db.query(reqGetOnePost, (err: QueryError, rows: RowDataPacket[0]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
    });
  });
};

export const serviceGetPostsByAuthor = (
  authorUid: string
): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const reqGetPostsByAuthor: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM users INNER JOIN posts ON u_id = p_fk_user_id WHERE u_uid = "${authorUid}"`;
    db.query(reqGetPostsByAuthor, (err: QueryError, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceUpdatePost = async (
  file: any,
  postUid: string,
  content: string,
  title: string,
  userUid: string,
  protocol: string,
  host: string
): Promise<QueryError | boolean | unknown> => {
  const filename = file.filename;
  const datas: any = checkIfUserIsPostOwnerAndGetDatas(file, postUid);
  const { postOwner, postId, postImgUrl } = datas;
  if (postOwner === userUid) {
    const postImgUrlToSend = setPostImgUrl(file, protocol, host, postImgUrl);
    console.log("1");
    return new Promise((resolve, reject) => {
      const reqUpdatePost: string = `UPDATE posts SET p_content = '${content}', p_post_img_url = '${postImgUrlToSend}',p_title = '${title}' WHERE p_id = ${postId}`;
      db.query(reqUpdatePost, (err: QueryError) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    if (file) {
      deleteNewImageOnServer(filename);
      throw Error("forbidden");
    } else {
      throw Error("forbidden");
    }
  }
};

export const serviceDeletePost = async (
  file: any,
  postUid: string,
  userUid: string
): Promise<QueryError | boolean | unknown> => {
  const datas: any = checkIfUserIsPostOwnerAndGetDatas(file, postUid);
  const { postOwner, postId, postImgUrl } = datas;
  if (postOwner === userUid) {
    return new Promise((resolve, reject) => {
      const reqDeletePost: string = `DELETE FROM posts WHERE p_uid = ${postId}`;
      db.query(reqDeletePost, (err: QueryError) => {
        err
          ? (console.log(err), reject(Error("query error")))
          : (deleteOldPostImageOnServer(postImgUrl), resolve(true));
      });
    });
  } else {
    throw Error("forbidden");
  }
};
