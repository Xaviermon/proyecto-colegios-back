import { Router } from "express";
import {
  getAllStudentsController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from "../modules/studentModule/student.controller";

const routerStudent = Router();

routerStudent.get("/", getAllStudentsController);
routerStudent.post("/create", createStudentController);
routerStudent.put("/:id", updateStudentController);
routerStudent.delete("/:id", deleteStudentController);

export default routerStudent;
