import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import { serviceSignup, serviceSignin } from "./sign.services";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const body: any = req.body;
  try {
    const result = await serviceSignup(body);
    if (result) res.status(201).json({ message: "Inscription réussie" });
  } catch (err: any) {
    errorResponse(err, res);
  }
};

export const signin = async (req: any, res: Response): Promise<void> => {
  const body: any = req.body;
  try {
    const data: any = await serviceSignin(body);
    if (data)
      res.status(200).json({
        message: "Connexion réussie",
        userUid: data.userUid,
        userRole: data.userRole,
        token: data.token,
      });
  } catch (err) {
    errorResponse(err, res);
  }
};
