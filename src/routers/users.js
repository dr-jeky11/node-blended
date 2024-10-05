// Створіть роут POST /users/registerдля реєстрації нового користувача. Тіло запиту має в себе включати наступні властивості:
// name - обов’язково
// email - обов’язково
// password - обов’язково
// Обробка цього роута має включати:
// Реєстрацію роута в файлі src/routers/users.js
// Валідацію отриманих даних
// Опис контролера для цього роута в файлі src/controllers/users.js
// Створення сервісу в файлі src/services/users.js
// Переконайтеся, що користувач із такою поштою ще не існує в системі, поверніть за допомогою бібілотеки createHttpError 409 помилку в іншому випадку і повідомлення 'Email in use’.
// Відповідь сервера, в разі успішного створення нового користувача, має бути зі статусом 201 і містити об’єкт з наступними властивостями:
// status — статус відповіді
// message — повідомлення про результат виконання операції "Successfully registered a user!"
// data — дані створеного користувача

import { Router } from 'express';
import { registerUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import { usersRegisterController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(usersRegisterController),
);

export default usersRouter;
