import { errorResponse } from "../utils/errors.utils";
import { Request, Response } from "express";
import { serviceSetAvatarUrl } from "./uploads.services";

export const setAvatar = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const file: any = req.file;
  const requestUserUid = req.requestUserUid;
  const avatarOwner = req.body.avatarOwnerUid;
  const protocol: string = req.protocol;
  const host = req.get("host");
  try {
    const result = await serviceSetAvatarUrl(
      file,
      requestUserUid,
      avatarOwner,
      protocol,
      host
    );
    if (result) res.status(200).json({ message: "Avatar modifié avec succès" });
  } catch (err) {
    errorResponse(err, res);
  }
};
