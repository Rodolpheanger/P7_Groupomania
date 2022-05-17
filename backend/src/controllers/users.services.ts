import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { hashPassword } from "../utils/password.utils";

export const serviceGetAllUsers = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const sqlGetUsers: string =
      "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_inscription_date, u_bio, u_isadmin FROM users";
    db.query(sqlGetUsers, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const serviceGetOneUser = (
  req: Request
): Promise<QueryError | string | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const sqlGetUser: string = `SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_inscription_date, u_bio, u_isadmin FROM users WHERE u_uid = '${req.params.id}'`;
    db.query(sqlGetUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? reject("Utilisateur non trouvé")
        : resolve(rows[0]);
    });
  });
};

const checkIfUserExist = (
  req: Request
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlFindUser: string = `SELECT u_uid FROM users WHERE u_uid = '${req.params.id}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? resolve(false)
        : resolve(rows[0].uid);
    });
  });
};

export const serviceUpdateUser = async (
  req: Request
): Promise<QueryError | boolean | unknown> => {
  const { username, email, password, firstname, lastname, bio } = req.body;
  try {
    const userExist = await checkIfUserExist(req);
    return userExist
      ? new Promise(async (resolve, reject) => {
          try {
            const hashedPassword = await hashPassword(password);
            const sqlUpdateUser: string = `UPDATE users SET u_username = '${username}', u_email = '${email}', u_password = '${hashedPassword}', u_firstname = '${firstname}', u_lastname = '${lastname}', u_bio = '${bio}' WHERE u_uid = '${req.params.id}'`;
            db.query(sqlUpdateUser, (err: QueryError): void => {
              err ? reject(err) : resolve(true);
            });
          } catch (err) {
            console.log(err);
            return err;
          }
        })
      : false;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const serviceDeleteUser = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  try {
    const userExist = await checkIfUserExist(req);
    return !userExist
      ? false
      : userExist === req.auth
      ? new Promise((resolve, reject) => {
          const sqlDeleteUser: string = `DELETE FROM users WHERE u_uid = '${req.params.id}'`;
          db.query(sqlDeleteUser, (err: string) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    return err;
  }
};
