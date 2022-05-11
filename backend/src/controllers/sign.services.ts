import { login } from "./sign.controllers";
import { Request, Response } from "express";
import { db } from "../../config/database";
import { hashPassword, checkPassword } from "../utils/password.utils";
import { createToken } from "../utils/auth.utils";
import { QueryError, RowDataPacket } from "mysql2";

// TODO: sortir les res.status pour les mettre dans les controllers

export const addUser = async (req: Request, res: Response): Promise<void> => {
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
  db.query(sqlSignUp, (err: QueryError, rows: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      login(req, res);
    }
  });
};

export const logUser = (req: Request, res: Response): void => {
  const sqlLogin: string = `SELECT uid, password FROM users WHERE email = "${req.body.email}";`;
  db.query(sqlLogin, async (err: QueryError, rows: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else if (rows.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const validPassword: boolean = await checkPassword(req, rows);
      if (!validPassword) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
        const token = createToken(rows);
        res.status(200).json({
          message: "Connexion réussie",
          token: token,
        });
      }
    }
  });
};
