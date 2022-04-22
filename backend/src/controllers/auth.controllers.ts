import { Request, Response } from "express";
import { db } from "../../config/database";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    const sqlSignIn: string = `
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
    db.query(sqlSignIn, (err: string) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(201).json({ message: "User added successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
