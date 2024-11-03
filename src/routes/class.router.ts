import { Router } from "express";
import {
  getAllClassesController,
  createClassController,
  updateClassController,
  deleteClassController,
} from "../controllers/class.controller";

const routerClass = Router();

routerClass.get("/", getAllClassesController);
routerClass.post("/", createClassController);
routerClass.put("/:id", updateClassController);
routerClass.delete("/:id", deleteClassController);

export default routerClass;