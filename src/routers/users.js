import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  usersLoginController,
  usersRegisterController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(usersRegisterController),
);

usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(usersLoginController),
);

export default usersRouter;
