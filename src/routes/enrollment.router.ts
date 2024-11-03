import { Router } from "express";
import {
  getAllEnrollmentsController,
  createEnrollmentController,
  updateEnrollmentController,
  deleteEnrollmentController,
} from "../controllers/enrollment.controller";

const routerEnrollment = Router();

routerEnrollment.get("/", getAllEnrollmentsController);
routerEnrollment.post("/", createEnrollmentController);
routerEnrollment.put("/:id", updateEnrollmentController);
routerEnrollment.delete("/:id", deleteEnrollmentController);

export default routerEnrollment;
