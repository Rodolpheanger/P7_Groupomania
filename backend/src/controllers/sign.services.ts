import { Request } from "express";
import { db } from "../../config/database";
import { hashPassword, checkPassword } from "../utils/password.utils";
import { createToken } from "../utils/auth.utils";
import { QueryError, RowDataPacket } from "mysql2";

// TODO: sortir les res.status pour les mettre dans les controllers

export const addUser = (req: Request): QueryError | unknown => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(req);
      const sqlSignUp: string = `
        INSERT INTO users (
          username,
          password,
          email,
          inscription_date,
          uid
          ) VALUES (
            "${req.body.username}",
            "${hashedPassword}",
            "${req.body.email}",
            NOW(),
            UUID());
          `;
      db.query(sqlSignUp, (err: QueryError) => {
        err ? reject(err) : resolve(true);
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  });
};

export const logUser = (req: Request): QueryError | unknown | any => {
  return new Promise((resolve, reject) => {
    const sqlLogin: string = `SELECT uid, password, admin FROM users WHERE email = "${req.body.email}";`;
    db.query(sqlLogin, async (err: QueryError, rows: RowDataPacket[]) => {
      try {
        if (err) {
          reject(err);
        } else if (rows.length === 0) {
          resolve("NoUser");
        } else {
          const validPassword: boolean = await checkPassword(req, rows);
          if (!validPassword) {
            resolve("WrongPassword");
          } else {
            const token = createToken(rows);
            const result = { token, uid: rows[0].uid };
            resolve(result);
          }
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    });
  });
};
