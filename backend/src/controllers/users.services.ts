import { Request, Response } from "express";
import { db } from "../../config/database";
import { hashPassword } from "./utils.controllers";

export const reqGetUsers = (req: Request, res: Response): void => {
  const sqlGetUsers: string =
    "SELECT username, email, firstname, lastname, inscription_date FROM users";
  db.query(sqlGetUsers, (err: string, docs: Object) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else {
      res.status(200).json(docs);
    }
  });
};

export const reqGetUser = (req: Request, res: Response): void => {
  const sqlGetUser: string = `SELECT username, email, firstname, lastname, inscription_date FROM users WHERE username = '${req.params.username}'`;
  db.query(sqlGetUser, (err: string, docs: any) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else if (docs.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.status(200).json(docs);
    }
  });
};

export const reqUpdateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sqlCheckExist: string = `SELECT username FROM users WHERE username ='${req.params.username}'`;
  db.query(sqlCheckExist, async (err: string, docs: any): Promise<void> => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else if (docs.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const hashedPassword = await hashPassword(req);
      const sqlUpdateUser: string = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}' WHERE username = '${req.params.username}'`;
      db.query(sqlUpdateUser, (err: string, docs: any): void => {
        if (err) {
          console.log(err);
          res.status(400).json({ err });
        } else {
          res.status(200).json({ message: "Profil mis à jour avec succès" });
        }
      });
    }
  });
};

export const reqDeleteUser = (req: Request, res: Response): void => {
  const sqlCheckExist: string = `SELECT username FROM users WHERE username ='${req.params.username}'`;
  db.query(sqlCheckExist, async (err: string, docs: any): Promise<void> => {
    console.log(docs);
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else if (docs.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const sqlDeleteUser: string = `DELETE FROM users WHERE username = '${req.params.username}'`;
      db.query(sqlDeleteUser, (err: string) => {
        if (err) {
          console.log(err);
          res.status(400).json({ err });
        } else {
          res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        }
      });
    }
  });
};
