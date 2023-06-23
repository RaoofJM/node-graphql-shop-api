import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
};

export const createError = (
  statusCode: number,
  message: string
): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;

  return error;
};
