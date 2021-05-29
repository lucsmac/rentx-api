import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserControler";

const usersRoutes = Router();
const createUserControle = new CreateUserController();

usersRoutes.post("/", createUserControle.handle);

export { usersRoutes };
