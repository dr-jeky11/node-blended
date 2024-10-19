import createHttpError from 'http-errors';
import { findUserById } from '../services/users.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const checkToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const { id } = jwt.verify(token, env('SECRET_KEY'));

  const user = await findUserById(id);

  if (!user || !user.token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  req.user = user;
  next();
};
