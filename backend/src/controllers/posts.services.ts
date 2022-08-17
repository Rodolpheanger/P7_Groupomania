import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfUserIsPostOwnerAndGetDatas } from "../utils/posts.utils";
import {
  deleteOldPostImageOnServer,
  createPostImgUrl,
  setPostImgUrl,
  deleteNewImageOnServer,
} from "../utils/uploads.utils";
import { checkUserRole } from "../utils/user-role.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceCreatePost = async (
  file: any,
  content: string,
  title: string,
  requestUserUid: string,
  protocol: string,
  host: string
): Promise<QueryError | boolean | unknown> => {
  const postImgUrl = createPostImgUrl(file, protocol, host);
  const userDatas = await checkIfUserExistAndGetDatas(file, requestUserUid);
  const userId = userDatas.u_id;
  return new Promise((resolve, reject) => {
    const sql: string =
      "INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_fk_user_id) VALUES (UUID(), ?, ?, NOW(), ?, ?)";
    const values: any = [content, postImgUrl, title, userId];
    db.execute(sql, values, (err: QueryError | null) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(true);
    });
  });
};

export const serviceGetAllPosts = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const sql: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username, u_avatar_url,u_uid FROM posts INNER JOIN users ON p_fk_user_id =  u_id ORDER BY p_creation_date DESC`;
    db.query(sql, (err: QueryError, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceGetOnePost = (
  postUid: string
): Promise<QueryError | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const sql: string =
      "SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = ?";
    const value: any = [postUid];
    db.execute(sql, value, (err: QueryError | null, rows: RowDataPacket[0]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
    });
  });
};

export const serviceUpdatePost = async (
  file: any,
  postUid: string,
  content: string,
  title: string,
  post_image: string,
  requestUserUid: string,
  protocol: string,
  host: string
): Promise<QueryError | boolean | unknown> => {
  const datas: any = await checkIfUserIsPostOwnerAndGetDatas(file, postUid);
  const { postOwner, postId, postImgUrl } = datas;
  if (postOwner === requestUserUid) {
    const postImgUrlToSend = post_image
      ? post_image
      : post_image === "" && postImgUrl
      ? deleteOldPostImageOnServer(postImgUrl)
      : setPostImgUrl(file, protocol, host, postImgUrl);
    return new Promise((resolve, reject) => {
      const sql: string =
        "UPDATE posts SET p_content = ?, p_post_img_url = ?, p_title = ? WHERE p_id = ?";
      const values: any = [content, postImgUrlToSend, title, postId];
      db.execute(sql, values, (err: QueryError | null) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    if (file) {
      const filename = file.filename;
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
  requestUserUid: string
): Promise<QueryError | boolean | unknown> => {
  const datas: any = await checkIfUserIsPostOwnerAndGetDatas(file, postUid);
  const userRole: string = await checkUserRole(requestUserUid);
  const { postOwner, postId, postImgUrl } = datas;
  if (postOwner === requestUserUid || userRole === "admin") {
    return new Promise((resolve, reject) => {
      const sql: string = "DELETE FROM posts WHERE p_id = ?";
      const value: any = [postId];
      db.execute(sql, value, (err: QueryError | null) => {
        err
          ? (console.log(err), reject(Error("query error")))
          : postImgUrl
          ? (deleteOldPostImageOnServer(postImgUrl), resolve(true))
          : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};
