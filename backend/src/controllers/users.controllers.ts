import { Request, Response } from "express";
import { db } from "../../config/database";

export const getUsers = (req: Request, res: Response): void => {
  const sqlGetUsers: string = "SELECT * FROM users";
  db.query(sqlGetUsers, (err: string, docs: Object) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
    } else {
      res.status(200).json(docs);
    }
  });
};
