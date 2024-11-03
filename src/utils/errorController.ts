import { Response } from "express";

export const ErrorHelper = (res: Response, error: string) => {
  console.log(error);
  return res.status(400).json(error);
};
