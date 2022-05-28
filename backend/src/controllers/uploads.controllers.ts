import { errorResponse } from "../utils/errors.utils";
import { Request, Response } from "express";
import { serviceSetAvatarUrl } from "./uploads.services";

export const setAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceSetAvatarUrl(req);
    if (result) res.status(200).json({ message: "Avatar modifié avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
