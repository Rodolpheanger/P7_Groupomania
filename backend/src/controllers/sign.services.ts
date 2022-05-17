import { Request } from "express";
import { db } from "../../config/database";
import { hashPassword, checkPassword } from "../utils/password.utils";
import { createToken } from "../utils/auth.utils";
import { QueryError, RowDataPacket } from "mysql2";

// TODO: sortir les res.status pour les mettre dans les controllers

export const serviceSignup = (req: Request) => {
  const { username, password, email } = req.body;
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(password);
      const sqlSignUp: string = `
        INSERT INTO users (
          u_username,
          u_password,
          u_email,
          u_inscription_date,
          u_uid
          ) VALUES (
            "${username}",
            "${hashedPassword}",
            "${email}",
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

export const serviceSignin = (req: Request) => {
  const { email, password } = req.body;
  return new Promise((resolve, reject) => {
    const sqlLogin: string = `SELECT u_uid, u_password, u_isadmin FROM users WHERE u_email = "${email}";`;
    db.query(sqlLogin, async (err: QueryError, rows: RowDataPacket[]) => {
      const { u_password, u_uid, u_isadmin } = rows[0];
      try {
        if (err) {
          reject(err);
        } else if (rows.length === 0) {
          resolve("NoUser");
        } else {
          const validPassword: boolean = await checkPassword(
            password,
            u_password
          );
          if (!validPassword) {
            resolve("WrongPassword");
          } else {
            const token: string = createToken(u_uid, u_isadmin);
            const result = {
              token,
              userUid: u_uid,
              userIsAdmin: u_isadmin,
            };
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
