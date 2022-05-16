import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { hashPassword } from "../utils/password.utils";

// TODO: sortir les res.status pour les mettre dans les controllers

export const reqGetUsers = (): Promise<QueryError | RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const sqlGetUsers: string =
      "SELECT uid, username, email, firstname, lastname, inscription_date FROM users";
    db.query(sqlGetUsers, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const reqGetUser = (
  req: Request
): Promise<QueryError | string | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const sqlGetUser: string = `SELECT uid, username, email, firstname, lastname, inscription_date, bio FROM users WHERE uid = '${req.params.uid}'`;
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
    const sqlFindUser: string = `SELECT uid FROM users WHERE uid = '${req.params.uid}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? resolve(false)
        : resolve(rows[0].uid);
    });
  });
};

export const reqUpdateUser = async (
  req: Request
): Promise<QueryError | boolean | unknown> => {
  try {
    const userExist = await checkIfUserExist(req);
    return userExist
      ? new Promise(async (resolve, reject) => {
          try {
            const hashedPassword = await hashPassword(req);
            const sqlUpdateUser: string = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', bio = '${req.body.bio}' WHERE uid = '${req.params.uid}'`;
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

export const reqDeleteUser = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  try {
    const userExist = await checkIfUserExist(req);
    return !userExist
      ? false
      : userExist === req.auth
      ? new Promise((resolve, reject) => {
          const sqlDeleteUser: string = `DELETE FROM users WHERE uid = '${req.params.uid}'`;
          db.query(sqlDeleteUser, (err: string) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    return err;
  }
};
