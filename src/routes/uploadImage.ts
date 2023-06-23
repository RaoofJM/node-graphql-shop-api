import express, { Request, Response, NextFunction } from "express";
import validator from "../helpers/validator";
import authentication from "./middlewares/authentication";
import joiSchema from "./joi";
import mkdirp from "mkdirp";
import { createError } from "./middlewares/error";
import appRootPath from "app-root-path";
import shortid from "shortid";
import sharp from "sharp";
import MultiMedia from "../database/model/multiMedia";
import ImageSize from "image-size";
import MultiMediaRepo from "../database/repository/multiMedia";
import fs from "fs";

const router = express.Router();

router.post(
  "/image-upload",
  authentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const levels = req.headers.levels as string;
      if (!levels.includes("admin"))
        return res.status(403).json({ status: 403, message: "access denied" });

      const image = req.files ? req.files.image : (null as any);
      if (!image) throw createError(401, "image is required");

      validator(joiSchema.imageUpload, image);

      const date = new Date();
      const fileData = `${date.getFullYear()}/${date.getMonth() + 1}`;
      const dir = `public/uploads/${fileData}`;
      const folderPath = appRootPath.resolve(dir);

      fs.mkdirSync(folderPath, { recursive: true });

      const fileName = `${shortid.generate()}_${image.name}`;

      await sharp(image.data)
        .jpeg({
          quality: 60,
        })
        .toFile(`./public/uploads/${fileData}/${fileName}`)
        .catch((err) => {
          if (err) throw createError(500, "image wasn't uploaded upload");
        });

      const url = `http://${req.headers.host}/uploads/${fileData}/${fileName}`;

      const imageSizeResult = ImageSize(folderPath + "/" + fileName);

      const multiMedia: MultiMedia = {
        dir: url,
        format: String(imageSizeResult.type),
        name: fileName,
        dimHeight: String(imageSizeResult.height),
        dimWidth: String(imageSizeResult.width),
      };

      await MultiMediaRepo.create(multiMedia);

      res.status(200).json({ message: "success", url });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
