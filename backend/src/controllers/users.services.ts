import { Request, Response } from "express";
import { QueryError, QueryOptions, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { hashPassword } from "../utils/password.utils";

// TODO: sortir les res.status pour les mettre dans les controllers

export const reqGetUsers = (req: Request, res: Response): void => {
  const sqlGetUsers: string =
    "SELECT username, email, firstname, lastname, inscription_date FROM users";
  db.query(sqlGetUsers, (err: QueryError, rows: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else {
      res.status(200).json(rows);
    }
  });
};

export const reqGetUser = (req: Request, res: Response): void => {
  const sqlGetUser: string = `SELECT username, email, firstname, lastname, inscription_date, bio FROM users WHERE username = '${req.params.username}'`;
  db.query(sqlGetUser, (err: QueryError, rows: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else if (rows.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.status(200).json(rows);
    }
  });
};

export const reqUpdateUser = (req: Request, res: Response): void => {
  const sqlCheckExist: string = `SELECT username FROM users WHERE username ='${req.params.username}'`;
  db.query(
    sqlCheckExist,
    async (err: QueryError, rows: RowDataPacket[]): Promise<void> => {
      if (err) {
        console.log(err);
        res.status(400).json({ err });
      } else if (rows.length === 0) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        const hashedPassword = await hashPassword(req);
        const sqlUpdateUser: string = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', bio = '${req.body.bio}' WHERE username = '${req.params.username}'`;
        db.query(sqlUpdateUser, (err: QueryError): void => {
          if (err) {
            console.log(err);
            res.status(400).json({ err });
          } else {
            res.status(200).json({ message: "Profil mis à jour avec succès" });
          }
        });
      }
    }
  );
};

export const reqDeleteUser = (req: Request | any, res: Response): void => {
  const sqlCheckExist: string = `SELECT uid FROM users WHERE username ='${req.params.username}'`;
  db.query(sqlCheckExist, (err: QueryError, rows: RowDataPacket[]): void => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else if (rows.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else if (rows[0].uid !== req.auth) {
      res.status(403).json({ message: "Requete non autorisée" });
    } else {
      const sqlDeleteUser: string = `DELETE FROM users WHERE username = '${req.params.username}'`;
      db.query(sqlDeleteUser, (err: string) => {
        if (err) {
          console.log(err);
          res.status(400).json({ err });
        } else {
          res.status(200).json({
            message: "Utilisateur supprimé avec succès",
          });
        }
      });
    }
  });
};
