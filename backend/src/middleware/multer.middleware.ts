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
    cb(new Error("Multer unexpected file"), false);
  }
};

const avatarStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req: Request | any, file, cb) => {
    const name = req.requestUserUid;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${name}.${extension}`);
  },
});

const postImageStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/posts_images");
  },
  filename: (req: Request | any, file, cb) => {
    const name = req.requestUserUid;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${name}_${Date.now()}.${extension}`);
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
}).single("post_image");
