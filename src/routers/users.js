import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  usersCurrentController,
  usersLoginController,
  usersLogoutController,
  usersRegisterController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkToken } from '../middlewares/checkToken.js';

const usersRouter = Router();

usersRouter.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(usersRegisterController),
);

usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(usersLoginController),
);

usersRouter.post('/logout', checkToken, ctrlWrapper(usersLogoutController));

usersRouter.get('/current', checkToken, ctrlWrapper(usersCurrentController));

export default usersRouter;
