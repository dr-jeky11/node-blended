import { UsersCollection } from '../db/models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../utils/env.js';

export const userByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = (id) => {
  const token = jwt.sign({ id }, env('SECRET_KEY'));
  return UsersCollection.findByIdAndUpdate(id, { token }, { new: true });
};

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
  return updateUserWithToken(user._id);
};

export const findUserById = (id) => UsersCollection.findById(id);

export const logoutUserByToken = (id) =>
  UsersCollection.findByIdAndUpdate(id, { token: '' });
