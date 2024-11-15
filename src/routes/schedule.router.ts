import { Router } from "express";
import {
  getAllSchedulesController,
  createScheduleController,
  updateScheduleController,
  deleteScheduleController,
} from "../modules/scheduleModule/schedule.controller";

const routerSchedule = Router();

routerSchedule.get("/", getAllSchedulesController);
routerSchedule.post("/", createScheduleController);
routerSchedule.put("/:id", updateScheduleController);
routerSchedule.delete("/:id", deleteScheduleController);

export default routerSchedule;