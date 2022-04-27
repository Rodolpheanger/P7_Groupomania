import { Request, Response } from "express";
import { db } from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
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
        // res.status(201).json({
        //   message: `Inscription confirmée ! Bienvenue ${req.body.username} !!!`,
        // });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const checkPassword = (req: Request, docs: any): Promise<boolean> => {
  return bcrypt.compare(req.body.password, docs[0].password);
};

const createToken = (docs: any): string => {
  return jwt.sign({ userId: docs[0].id }, `${process.env.JWT_SECRETKEY}`, {
    expiresIn: "24h",
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
