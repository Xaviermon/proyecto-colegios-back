import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import { CoursesAttributes, CoursesInput } from "../models/course"
import { 
  getAllCourse,
  createCourse,
  updateCourse,
  deleteCourse 
} from "../services/course.services";

export const getAllCourseController = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10); 
    const limit = parseInt(req.query.limit as string, 10);

    const result = await getAllCourse(page, limit)
    return res.status(200).send(result)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
};

export const createCourseController = async (req: Request, res:Response) => {
  try {
    const { name, code, description } : CoursesInput = req.body
    const newCourse = await createCourse(name, code, description)

    return res.status(200).send(newCourse)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const updateCourseController = async(req: Request, res: Response) => {
  try {
    const { id, name, code, description } : CoursesAttributes = req.body
    const newUpdateCourse = await updateCourse(id, name, code, description)

    return res.status(200).json(newUpdateCourse)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const deleteCourseController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.body.id as string, 10)
    return res.status(200).json(deleteCourse(id))
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}