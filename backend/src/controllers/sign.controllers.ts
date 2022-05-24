import { Request, Response } from "express";
import { errorResponse } from "../utils/errors.utils";
import { serviceSignup, serviceSignin } from "./sign.services";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSignup(req);
    if (result) signin(req, res);
  } catch (err: any) {
    errorResponse(err, res);
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: any = await serviceSignin(req);
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
