import { Request } from "express";
import multer from "multer";

const MIME_TYPES: any = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const fileFilter = (
  req: Request,
  file: { mimetype: string },
  cb: any
): void => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(
      new Error(
        "Le type de fichier est invalide (fichiers jpg, jpeg ou png uniquement)"
      )
    );
  }
};

const avatarStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req: Request | any, file, cb) => {
    const name = req.userUid;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${name}.${extension}`);
  },
});

const postImageStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "frontend/public/uploads/posts_img");
  },
  filename: (req: Request | { body: any }, file, cb) => {
    const name = req.body.postUid;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${name}.${Date.now()}.${extension}`);
  },
});

//@ts-ignore
export const uploadAvatar = multer({
  limits: { fileSize: 1000000 },
  fileFilter,
  storage: avatarStorage,
}).single("avatar");
//@ts-ignore
export const uploadPostImage = multer({
  limits: { fileSize: 2000000 },
  fileFilter,
  storage: postImageStorage,
}).single("avatar");
