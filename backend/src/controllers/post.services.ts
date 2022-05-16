import { rejects } from "assert";
import { query, Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

const getUserId = (req: Request | any): Promise<QueryError | number> => {
  console.log(req.auth);
  return new Promise((resolve, reject) => {
    const reqGetUserId: string = `SELECT id FROM users WHERE uid = "${req.auth}"`;
    db.query(reqGetUserId, (err: QueryError, rows: RowDataPacket[]) => {
      console.log(rows);
      err ? reject(err) : resolve(rows[0].id);
    });
  });
};

export const serviceCreatePost = async (req: Request): Promise<any> => {
  try {
    const userId = await getUserId(req);
    return new Promise((resolve, reject) => {
      const reqCreatePost: string = `INSERT INTO posts (uid, content, post_img_url, creation_date, title, modification_date, user_id) VALUES (UUID(), "${req.body.content}", "${req.body.post_img_url}", NOW(), "${req.body.title}", NULL, "${userId}") `;
      db.query(reqCreatePost, (err: QueryError) => {
        err ? reject(err) : resolve(true);
      });
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const serviceGetAllPosts = (req: Request) => {
  return new Promise((resolve, reject) => {
    const reqGetAllPosts: string = `SELECT uid, content, post_img_url, creation_date, title, modification_date, user_id FROM posts`;
    db.query(reqGetAllPosts, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows);
    });
  });
};
