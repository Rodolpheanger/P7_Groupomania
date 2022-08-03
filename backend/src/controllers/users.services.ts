import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { checkPassword, hashPassword } from "../utils/password.utils";
import { deleteAvatarImgIfExist } from "../utils/uploads.utils";
import { checkUserRole } from "../utils/user-role.utils";
import {
  checkIfUserExistAndGetDatas,
  checkIfUserIsUserOwner,
} from "../utils/users.utils";

// * INFO: non utilisé
// export const serviceGetAllUsers = (): Promise<QueryError | RowDataPacket[]> => {
//   return new Promise((resolve, reject) => {
//     const sql: string =
//       "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users";
//     db.query(sql, (err: QueryError, rows: RowDataPacket[]) => {
//       err ? (console.log(err), reject(err)) : resolve(rows);
//     });
//   });
// };

export const serviceGetOneUser = async (
  file: any,
  userUid: string
): Promise<QueryError | string | RowDataPacket[0]> => {
  const datas = await checkIfUserExistAndGetDatas(file, userUid);
  const userId = datas.u_id;
  return new Promise((resolve, reject) => {
    const sql: string =
      "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users WHERE u_id = ?";
    const value: any = [userId];
    db.execute(sql, value, (err: QueryError | null, rows: RowDataPacket[0]) => {
      err ? (console.log(err), reject(err)) : resolve(rows[0]);
    });
  });
};

export const serviceUpdatePassword = async (
  file: any,
  requestUserUid: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<QueryError | string | boolean> => {
  const datas: any = await checkIfUserExistAndGetDatas(file, requestUserUid);
  const { u_id, u_password } = datas;
  const isPasswordCorrect = await checkPassword(oldPassword, u_password);
  if (isPasswordCorrect && newPassword === confirmPassword) {
    const hashedNewPassword = await hashPassword(newPassword);
    return new Promise((resolve, reject) => {
      const sql: string = "UPDATE users SET u_password = ? WHERE u_id = ?";
      const values: any = [hashedNewPassword, u_id];
      db.execute(sql, values, (err: QueryError | null): void => {
        err ? (console.log(err), reject(err)) : resolve(true);
      });
    });
  } else {
    if (!isPasswordCorrect) throw Error("old");
    else if (newPassword !== confirmPassword)
      throw Error("passwords don't match");
    else throw Error("forbidden");
  }
};

export const serviceUpdateUser = async (
  file: any,
  userToModifyUid: string,
  requestUserUid: string,
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  bio: string
): Promise<QueryError | boolean | unknown> => {
  const datas: any = await checkIfUserIsUserOwner(file, userToModifyUid);
  const { userOwner, userId } = datas;
  if (userOwner === requestUserUid) {
    return new Promise((resolve, reject) => {
      const sql: string =
        "UPDATE users SET u_username = ?, u_email = ?, u_firstname = ?, u_lastname = ?, u_bio = ? WHERE u_id = ?";
      const values: any = [username, email, firstname, lastname, bio, userId];
      db.execute(sql, values, (err: QueryError | null): any => {
        err ? (console.log(err), reject(err)) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};

export const serviceDeleteUser = async (
  file: any,
  userToDeleteUid: string,
  requestUserUid: string
): Promise<QueryError | boolean | unknown> => {
  const datas: any = await checkIfUserIsUserOwner(file, userToDeleteUid);
  const userRole: string = await checkUserRole(requestUserUid);
  const { userOwner, userId, avatarUrl } = datas;
  if (userOwner === requestUserUid || userRole === "admin") {
    return new Promise((resolve, reject) => {
      deleteAvatarImgIfExist(file, avatarUrl);
      const sql: string = "DELETE FROM users WHERE u_id = ?";
      const value: any = [userId];
      db.execute(sql, value, (err: QueryError | null) => {
        err ? (console.log(err), reject(err)) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};
