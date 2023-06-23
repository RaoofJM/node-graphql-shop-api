import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/jwt";
import UserRepo from "../../database/repository/user";
import { createError } from "./error";

const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (await verifyToken(req.headers.token as string)) as any;

    let user;
    let levels;
    if (token) {
      user = await UserRepo.findById(token.id);
      levels = user?.levels;
    } else {
      throw createError(402, "token is not valid");
    }

    req.headers.token = token;
    req.headers.levels = levels;

    next();
  } catch (err) {
    next(err);
  }
});

export default router;
