import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import { StudentAttributes, StudentAttributesInput } from "../models/student"
import { 
  getAllStudent,
  createStudent,
  updateStudent,
  deleteStudent 
} from "../services/student.services";

export const getAllStudentController = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10); 
    const limit = parseInt(req.query.limit as string, 10);

    const result = await getAllStudent(page, limit)
    return res.status(200).send(result)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
};

export const createStudentController = async (req: Request, res:Response) => {
  try {
    const { name, email, grade, enrollmentData } : StudentAttributesInput = req.body
    const newEnrollment = await createStudent(name, email, grade, enrollmentData)

    return res.status(200).send(newEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const updateStudentController = async(req: Request, res: Response) => {
  try {
    const { id, name, email, grade, enrollmentData } : StudentAttributes = req.body
    const newUpdateEnrollment = await updateStudent(id, name, email, grade, enrollmentData)

    return res.status(200).json(newUpdateEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.body.id as string, 10)
    return res.status(200).json(deleteStudent(id))
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}