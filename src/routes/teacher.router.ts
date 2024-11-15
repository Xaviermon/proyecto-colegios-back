import { Router } from "express";
import {
  getAllTeachersController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
} from "../modules/teacherModule/teacher.controller";

const routerTeacher = Router();

routerTeacher.get("/", getAllTeachersController);
routerTeacher.post("/create", createTeacherController);
routerTeacher.put("/:id", updateTeacherController);
routerTeacher.delete("/:id", deleteTeacherController);

export default routerTeacher;