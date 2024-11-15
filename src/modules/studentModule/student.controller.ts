import { Request, Response } from "express";
import { ErrorHelper } from "../../utils/errorController";
import {
  createStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
} from "./student.services";

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const newStudent = await createStudent(req.body);
    res.json(newStudent);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await updateStudent(Number(req.params.id), req.body);
    res.json(updatedStudent);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const students = await getAllStudents(Number(page), Number(limit));
    res.json(students);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const message = await deleteStudent(Number(req.params.id));
    res.json(message);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};