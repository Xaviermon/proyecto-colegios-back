import { Request, Response } from "express";
import { ErrorHelper } from "../../utils/errorController";
import { authUser } from "./authUser.Services";

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authUser(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};