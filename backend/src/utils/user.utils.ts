import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { StringLocale } from "yup/lib/locale";
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

export const checkIfUserExistAndGetDatas = (
  data: string,
  dataType: string
): Promise<QueryError | boolean | any> => {
  return new Promise((resolve, reject) => {
    const sqlFindUser: string = `SELECT u_uid, u_avatar_url FROM users WHERE ${dataType} = '${data}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]) => {
      err
        ? reject(err)
        : rows.length === 0
        ? reject({ error: "Utilisateur non trouvé" })
        : resolve(rows[0]);
    });
  });
};
