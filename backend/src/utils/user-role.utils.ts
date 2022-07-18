import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const checkUserRole = (requestUserUid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sql: string = "SELECT u_role FROM users WHERE u_uid = ?";
    const value: any = [requestUserUid];
    db.execute(sql, value, (err: QueryError | null, rows: RowDataPacket[]) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : resolve(rows[0].u_role);
    });
  });
};
