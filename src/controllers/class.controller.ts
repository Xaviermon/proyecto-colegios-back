import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../services/class.services";

export const getAllClassesController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const classes = await getAllClasses(Number(page), Number(limit));
    res.json(classes);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const createClassController = async (req: Request, res: Response) => {
  try {
    const newClass = await createClass(req.body);
    res.json(newClass);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const updateClassController = async (req: Request, res: Response) => {
  try {
    const updatedClass = await updateClass(Number(req.params.id), req.body);
    res.json(updatedClass);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const deleteClassController = async (req: Request, res: Response) => {
  try {
    const message = await deleteClass(Number(req.params.id));
    res.json(message);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};
