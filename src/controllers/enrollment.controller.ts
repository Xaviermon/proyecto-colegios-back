import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import {
  createEnrollment,
  updateEnrollment,
  getAllEnrollments,
  deleteEnrollment,
} from "../services/enrollment.services";

export const createEnrollmentController = async (req: Request, res: Response) => {
  try {
    const newEnrollment = await createEnrollment(req.body);
    res.json(newEnrollment);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const updateEnrollmentController = async (req: Request, res: Response) => {
  try {
    const updatedEnrollment = await updateEnrollment(Number(req.params.id), req.body);
    res.json(updatedEnrollment);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const getAllEnrollmentsController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const enrollments = await getAllEnrollments(Number(page), Number(limit));
    res.json(enrollments);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const deleteEnrollmentController = async (req: Request, res: Response) => {
  try {
    const message = await deleteEnrollment(Number(req.params.id));
    res.json(message);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};
