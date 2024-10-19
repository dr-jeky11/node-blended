import { Router } from 'express';
import { registerUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import { usersRegisterController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(usersRegisterController),
);

// usersRouter.post(
//   '/login',
//   validateBody(loginUserSchema),
//   ctrlWrapper(usersLoginController),
// );

export default usersRouter;
