import { db } from "../../config/database";
import { hashPassword, checkPassword } from "../utils/password.utils";
import { createToken } from "../utils/auth.utils";
import { QueryError, RowDataPacket } from "mysql2";

export const serviceSignup = (body: any) => {
  const { username, password, email } = body;
  return new Promise(async (resolve, reject) => {
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
    db.query(sqlSignUp, (err: QueryError | any) => {
      err ? (console.log(err), reject(err)) : resolve(true);
    });
  });
};

export const serviceSignin = (body: any) => {
  const { email, password } = body;
  return new Promise((resolve, reject) => {
    const sqlLogin: string = `SELECT u_uid, u_password, u_role FROM users WHERE u_email = "${email}";`;
    db.query(sqlLogin, async (err: QueryError, rows: RowDataPacket[]) => {
      if (err) {
        console.log(err), reject(Error("query error"));
      } else if (rows.length === 0) {
        reject(Error("user not found"));
      } else {
        const { u_password, u_uid, u_role } = rows[0];
        const validPassword: boolean = await checkPassword(
          password,
          u_password
        );
        if (!validPassword) {
          reject(Error("invalid password"));
        } else {
          const token: string = createToken(u_uid, u_role);
          const result = {
            token,
            userUid: u_uid,
            useRole: u_role,
          };
          resolve(result);
        }
      }
    });
  });
};
