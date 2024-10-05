import createHttpError from 'http-errors';
import {
  userByEmail,
  createUser,
  createActiveSession,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/Session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/constants.js';

export const usersRegisterController = async (req, res) => {
  const { email, name } = req.body;

  const userEmail = await userByEmail(email);

  if (userEmail) {
    throw createHttpError(409, 'Email in use');
  }

  await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name,
      email,
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
  const session = await createActiveSession(user._id);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
