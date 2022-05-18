import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const getUserId = (req: Request | any): Promise<QueryError | number> => {
  return new Promise((resolve, reject) => {
    const reqGetUserId: string = `SELECT u_id FROM users WHERE u_uid = "${req.userUid}"`;
    db.query(reqGetUserId, (err: QueryError, rows: RowDataPacket[]) => {
      console.log(rows);
      err ? reject(err) : resolve(rows[0].u_id);
    });
  });
};

export const checkIfUserExistAndGetUid = (
  userUid: string
): Promise<QueryError | boolean | string> => {
  return new Promise((resolve, reject) => {
    const sqlFindUser: string = `SELECT u_uid FROM users WHERE u_uid = '${userUid}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? resolve(false)
        : resolve(rows[0].u_uid);
    });
  });
};
