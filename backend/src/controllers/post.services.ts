import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkIfPostExistAndGetOwner } from "../utils/post.utils";
import { getUserId } from "../utils/user.utils";

export const serviceCreatePost = async (
  req: Request
): Promise<QueryError | boolean | unknown> => {
  const { content, post_img_url, title } = req.body;
  try {
    const userId = await getUserId(req);
    return new Promise((resolve, reject) => {
      const reqCreatePost: string = `INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, p_fk_user_id) VALUES (UUID(), "${content}", "${post_img_url}", NOW(), "${title}", NULL, "${userId}") `;
      db.query(reqCreatePost, (err: QueryError) => {
        err ? reject(err) : resolve(true);
      });
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const serviceGetAllPosts = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const reqGetAllPosts: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id =  u_id`;
    db.query(reqGetAllPosts, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const serviceGetOnePost = (
  req: Request
): Promise<QueryError | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const reqGetOnePost: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = "${req.params.id}"`;
    db.query(reqGetOnePost, (err: QueryError, rows: RowDataPacket[0]) => {
      err ? reject(err) : resolve(rows[0]);
    });
  });
};

export const serviceGetPostsByAuthor = (
  req: Request
): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const reqGetPostsByAuthor: string = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM users INNER JOIN posts ON u_id = p_fk_user_id WHERE u_uid = "${req.body.author}"`;
    db.query(reqGetPostsByAuthor, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const serviceUpdatePost = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const postId: string = req.params.id;
  const { content, imgUrl, title } = req.body;
  try {
    const postData = await checkIfPostExistAndGetOwner(postId);
    return !postData
      ? false
      : postData === req.userUid
      ? new Promise((resolve, reject) => {
          const reqUpdatePost: string = `UPDATE posts SET p_content = '${content}', p_post_img_url = '${imgUrl}', p_title = '${title}' WHERE p_uid = '${postId}'`;
          db.query(reqUpdatePost, (err: QueryError) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const serviceDeletePost = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const postId: string = req.params.id;
  try {
    const postData = await checkIfPostExistAndGetOwner(postId);
    return !postData
      ? false
      : postData === req.userUid
      ? new Promise((resolve, reject) => {
          const reqDeletePost: string = `DELETE FROM posts WHERE p_uid = '${postId}'`;
          db.query(reqDeletePost, (err: QueryError) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    console.log(err);
    return err;
  }
};
