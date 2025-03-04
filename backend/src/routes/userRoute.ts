import { Router } from "express";
import { getUserById, postUser } from "../controllers/userController";

const userRouter = Router()

userRouter.post('/', postUser);
userRouter.get('/:id', getUserById);

export default userRouter;