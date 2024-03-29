import { RowDataPacket } from "mysql2";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { deleteNewImageOnServer } from "./uploads.utils";

export const checkIfPostExistAndGetDatas = (
  file: any,
  postUid: string
): Promise<QueryError | any> => {
  let filename = "";
  return new Promise((resolve, reject): any => {
    const sql: string =
      "SELECT u_uid, p_post_img_url, p_id FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = ?";
    const value: any = [postUid];
    db.execute(
      sql,
      value,
      (err: QueryError | null, rows: RowDataPacket[]): void | any => {
        err
          ? (console.log(err), reject(Error("query error")))
          : rows.length === 0 && file
          ? ((filename = file.filename),
            deleteNewImageOnServer(filename),
            console.log(err),
            reject(Error("post not found")))
          : rows.length === 0
          ? (console.log(err), reject(Error("post not found")))
          : resolve(rows[0]);
      }
    );
  });
};

export const checkIfUserIsPostOwnerAndGetDatas = async (
  file: any,
  postUid: string
) => {
  const postDatas = await checkIfPostExistAndGetDatas(file, postUid);
  const postOwner = postDatas.u_uid;
  const postId = postDatas.p_id;
  const postImgUrl = postDatas.p_post_img_url;
  return { postOwner, postId, postImgUrl };
};
