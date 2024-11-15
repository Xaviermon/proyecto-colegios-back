import { Router } from "express";
import { loginUserController } from "../modules/loginUserModule/authUser.Controller";

const routerAuthUser = Router();

routerAuthUser.post("/login", loginUserController);

export default routerAuthUser;