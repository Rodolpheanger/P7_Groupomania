import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const checkUserRole = (requestUserUid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sqlCheckUserRole: string = `SELECT u_role FROM users WHERE u_uid ='${requestUserUid}'`;
    db.query(sqlCheckUserRole, (err: QueryError, rows: RowDataPacket[]) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve(rows[0].u_role);
    });
  });
};
