import { Router } from "express";
import {
  getAllSchedulesController,
  createScheduleController,
  updateScheduleController,
  deleteScheduleController,
} from "../controllers/schedule.controller";

const routerSchedule = Router();

routerSchedule.get("/", getAllSchedulesController);
routerSchedule.post("/", createScheduleController);
routerSchedule.put("/:id", updateScheduleController);
routerSchedule.delete("/:id", deleteScheduleController);

export default routerSchedule;