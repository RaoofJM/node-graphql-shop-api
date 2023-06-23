import imageUploadRouter from "./uploadImage";
import express from "express";
import authentication from "./middlewares/authentication";

const router = express.Router();

router.use(imageUploadRouter);

export default router;
