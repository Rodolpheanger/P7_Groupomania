import { login } from "./sign.controllers";
import { Request, Response } from "express";
import { db } from "../../config/database";
import { hashPassword, checkPassword, createToken } from "./utils.controllers";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const hashedPassword = await hashPassword(req);
  const sqlSignUp: string = `
INSERT INTO users (
  username,
  password,
  email,
  firstname,
  lastname,
  inscription_date
  ) VALUES (
    "${req.body.username}",
    "${hashedPassword}",
    "${req.body.email}",
    "${req.body.firstname}",
    "${req.body.lastname}",
    NOW());
  `;
  db.query(sqlSignUp, (err: string) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      login(req, res);
    }
  });
};

export const logUser = (req: Request, res: Response): void => {
  const sqlLogin: string = `SELECT id, password FROM users WHERE email = "${req.body.email}";`;
  db.query(sqlLogin, async (err: String, docs: any) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else if (docs.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const validPassword: boolean = await checkPassword(req, docs);
      if (!validPassword) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
        const token = createToken(docs);
        res.status(200).json({
          token: token,
        });
      }
    }
  });
};
