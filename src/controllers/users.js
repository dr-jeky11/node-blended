import createHttpError from 'http-errors';
import {
  userByEmail,
  createUser,
  updateUserWithToken,
  logoutUserByToken,
} from '../services/users.js';
import bcrypt from 'bcrypt';

export const usersRegisterController = async (req, res) => {
  const { email, name } = req.body;

  const userEmail = await userByEmail(email);

  if (userEmail) {
    throw createHttpError(409, 'Email in use');
  }

  const user = await createUser(req.body);

  res.status(201).json({
    token: user.token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export const usersLoginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userByEmail(email);
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }
  const correctPassword = bcrypt.compare(password, user.password);

  if (!correctPassword) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const updatedUser = await updateUserWithToken(user._id);

  res.json({
    token: updatedUser.token,
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });
};

export const usersLogoutController = async (req, res) => {
  await logoutUserByToken(req.user._id);

  res.sendStatus(204);
};

export const usersCurrentController = (req, res) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};
