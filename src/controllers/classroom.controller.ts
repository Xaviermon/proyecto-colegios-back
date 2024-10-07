import { Request, Response } from "express";
import { ErrorHelper } from "../utils/errorController";
import { ClassRoomInput } from "../models/classroom";
import {
  getAllClassRoom,
  createClassRoom,
  updateClassRoom,
  deleteClassRoom
} from "../services/classroom.services"

export const getAllClassRoomController = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1; 
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await getAllClassRoom(page, limit)
    return res.status(200).send(result)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
};

export const createClassRoomController = async (req: Request, res:Response) => {
  try {
    const { name, capacity } : ClassRoomInput = req.body
    const newClassRoom = await createClassRoom(name, capacity)

    return res.status(200).send(newClassRoom)
  } catch (error: any) {
    return ErrorHelper(res, error)
  }
}

export const updateClassRoomController = async(req: Request, res: Response) => {
  try {
    const { id, name, capacity } : ClassRoomInput = req.body
    if (id) {
      const newUpdateClassRoom = await updateClassRoom(id, name, capacity)
    }
  } catch (error) {
    
  }
}