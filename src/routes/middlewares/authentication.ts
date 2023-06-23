import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/jwt";
import UserRepo from "../../database/repository/user";

const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  const token = (await verifyToken(req.headers.token as string)) as any;

  let user;
  let levels;
  if (token) {
    user = await UserRepo.findById(token.id);
    levels = user?.levels;
  } else {
    return res.status(402).json({ status: 402, message: "token is not valid" });
  }

  req.headers.token = token;
  req.headers.levels = levels;

  next();
});

export default router;
