import { Router } from "express";
import routerClass from "./class.router";
import routerSchedule from "./schedule.router";
import routerStudent from "./student.router";
import routerTeacher from "./teacher.router";
import routerEnrollment from "./enrollment.router";
import routerAuthUser from "./authUser.router";

const router = Router();

router.get("/", (_, res) => {
  res.send("back deploy railway");
});

router.use("/class", routerClass);
router.use("/schedule", routerSchedule);
router.use("/student", routerStudent);
router.use("/teacher", routerTeacher);
router.use("/enrollment", routerEnrollment);
router.use("/auth", routerAuthUser);

export default router;
