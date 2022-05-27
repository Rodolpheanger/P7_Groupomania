import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { hashPassword } from "../utils/password.utils";
import { deleteAvatarImgIfExist } from "../utils/uploads.utils";
import {
  checkIfUserExistAndGetDatas,
  checkIfUserIsUserOwner,
} from "../utils/user.utils";

export const serviceGetAllUsers = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const sqlGetUsers: string =
      "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users";
    db.query(sqlGetUsers, (err: QueryError, rows: RowDataPacket[]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
    });
  });
};

export const serviceGetOneUser = async (
  req: Request | any
): Promise<QueryError | string | RowDataPacket[0]> => {
  const userUid = req.params.id;
  const datas = await checkIfUserExistAndGetDatas(req, userUid);
  const userId = datas.u_id;
  return new Promise((resolve, reject) => {
    const sqlGetUser: string = `SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users WHERE u_id = '${userId}'`;
    db.query(sqlGetUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
    });
  });
};

export const serviceUpdateUser = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const userUid = req.params.id;
  const { username, email, password, firstname, lastname, bio } = req.body;
  const datas: any = await checkIfUserIsUserOwner(req, userUid);
  const { userOwner, userId } = datas;
  if (userOwner === req.userUid) {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await hashPassword(password);
      const sqlUpdateUser: string = `UPDATE users SET u_username = '${username}', u_email = '${email}', u_password = '${hashedPassword}', u_firstname = '${firstname}', u_lastname = '${lastname}', u_bio = '${bio}' WHERE u_id = ${userId}`;
      db.query(sqlUpdateUser, (err: QueryError): void => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};

export const serviceDeleteUser = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const userUid = req.params.id;
  const datas: any = await checkIfUserIsUserOwner(req, userUid);
  const { userOwner, userId, avatarUrl } = datas;
  if (userOwner === req.userUid) {
    return new Promise((resolve, reject) => {
      deleteAvatarImgIfExist(req, avatarUrl);
      const sqlDeleteUser: string = `DELETE FROM users WHERE u_id = '${userId}'`;
      db.query(sqlDeleteUser, (err: string) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    throw Error("forbidden");
  }
};
