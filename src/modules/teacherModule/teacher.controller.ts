import { Request, Response } from "express";
import { ErrorHelper } from "../../utils/errorController";
import {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  deleteTeacher,
} from "./teacher.services";

export const createTeacherController = async (req: Request, res: Response) => {
  try {
    const newTeacher = await createTeacher(req.body);
    res.json(newTeacher);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const updateTeacherController = async (req: Request, res: Response) => {
  try {
    const updatedTeacher = await updateTeacher(Number(req.params.id), req.body);
    res.json(updatedTeacher);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const getAllTeachersController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const teachers = await getAllTeachers(Number(page), Number(limit));
    res.json(teachers);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const deleteTeacherController = async (req: Request, res: Response) => {
  try {
    const message = await deleteTeacher(Number(req.params.id));
    res.json(message);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};