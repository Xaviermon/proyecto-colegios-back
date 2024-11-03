import { Router } from "express";
import {
  getAllTeachersController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
} from "../controllers/teacher.controller";

const routerTeacher = Router();

routerTeacher.get("/", getAllTeachersController);
routerTeacher.post("/", createTeacherController);
routerTeacher.put("/:id", updateTeacherController);
routerTeacher.delete("/:id", deleteTeacherController);

export default routerTeacher;