import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import { EnrollmentAttributes, EnrollmentInput } from "../models/enrollment"
import { 
  getAllEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment 
} from "../services/enrollment.services";

export const getAllEnrollmentController = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10); 
    const limit = parseInt(req.query.limit as string, 10);

    const result = await getAllEnrollment(page, limit)
    return res.status(200).send(result)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
};

export const createEnrollmentController = async (req: Request, res:Response) => {
  try {
    const { enrollmentDate } : EnrollmentInput = req.body
    const newEnrollment = await createEnrollment(enrollmentDate)

    return res.status(200).send(newEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const updateEnrollmentController = async(req: Request, res: Response) => {
  try {
    const { id, enrollmentDate } : EnrollmentAttributes = req.body
    const newUpdateEnrollment = await updateEnrollment(id, enrollmentDate)

    return res.status(200).json(newUpdateEnrollment)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const deleteEnrollmentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.body.id as string, 10)
    return res.status(200).json(deleteEnrollment(id))
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}