import express, { Request, Response, NextFunction } from "express";
import authentication from "./middlewares/authentication";

const router = express.Router();

router.get(
  "/image-upload",
  authentication,
  (req: Request, res: Response, next: NextFunction) => {
    const levels = req.headers.levels as string;
    if (!levels.includes("admin"))
      return res.status(403).json({ status: 403, message: "access denied" });

    console.log(req.files);

    const image = req.files ? req.files.image : null;
    if (!image)
      return res
        .status(401)
        .json({ status: 401, message: "image is required" });
  }
);

export default router;
