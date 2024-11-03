import { Router } from "express";
import {
  getAllStudentsController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/student.controller";

const routerStudent = Router();

routerStudent.get("/", getAllStudentsController);
routerStudent.post("/", createStudentController);
routerStudent.put("/:id", updateStudentController);
routerStudent.delete("/:id", deleteStudentController);

export default routerStudent;
