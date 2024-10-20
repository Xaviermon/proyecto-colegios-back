import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import { InstructorAttributes, InstructorInput } from "../models/instructor"
import { 
  getAllTeachert,
  createTeacher,
  updateTeacher,
  deleteTeacher 
} from "../services/instructor.services";

export const getAllTeacherController = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10); 
    const limit = parseInt(req.query.limit as string, 10);

    const result = await getAllTeachert(page, limit)
    return res.status(200).send(result)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
};

export const createTeacherController = async (req: Request, res:Response) => {
  try {
    const { name, email, hireDate } : InstructorInput = req.body
    const newEnrollment = await createTeacher(name, email, hireDate)

    return res.status(200).send(newEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const updateTeacherController = async(req: Request, res: Response) => {
  try {
    const { id, name, email, hireDate } : InstructorAttributes = req.body
    const newUpdateEnrollment = await updateTeacher(id, name, email, hireDate)

    return res.status(200).json(newUpdateEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const deleteTeacherController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.body.id as string, 10)
    return res.status(200).json(deleteTeacher(id))
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}