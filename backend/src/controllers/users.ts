import { Request, Response } from "express";
import { db } from "../../config/database";
import bcrypt from "bcrypt";

export const getUsers = (req: Request, res: Response): void => {
  db.query("SELECT * FROM users", (err: string, result: Object) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    db.query(
      `
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
        `,
      (err: string, result: Object) => {
        if (err) throw err;
        res.status(201).json({ message: "User added successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
