import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const getUserId = (req: Request | any): Promise<QueryError | number> => {
  return new Promise((resolve, reject) => {
    const reqGetUserId: string = `SELECT u_id FROM users WHERE u_uid = "${req.auth}"`;
    db.query(reqGetUserId, (err: QueryError, rows: RowDataPacket[]) => {
      err ? reject(err) : resolve(rows[0].u_id);
    });
  });
};
