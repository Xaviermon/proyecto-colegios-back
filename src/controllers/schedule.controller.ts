import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import {
  createSchedule,
  updateSchedule,
  getAllSchedules,
  deleteSchedule,
} from "../services/schedule.services";

export const createScheduleController = async (req: Request, res: Response) => {
  try {
    const newSchedule = await createSchedule(req.body);
    res.json(newSchedule);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const updateScheduleController = async (req: Request, res: Response) => {
  try {
    const updatedSchedule = await updateSchedule(Number(req.params.id), req.body);
    res.json(updatedSchedule);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const getAllSchedulesController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const schedules = await getAllSchedules(Number(page), Number(limit));
    res.json(schedules);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  try {
    const message = await deleteSchedule(Number(req.params.id));
    res.json(message);
  } catch (error: any) {
    ErrorHelper(res, error);
  }
};