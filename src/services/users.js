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

// export const createActiveSession = async (userId) => {
//   await SessionsCollection.deleteOne({ userId });
//   const accessToken = randomBytes(30).toString('base64');
//   const refreshToken = randomBytes(30).toString('base64');

//   const accessTokenValidUntil = Date.now() + FIFTEEN_MINUTES;
//   const refreshTokenValidUntil = Date.now() + THIRTY_DAYS;

//   return SessionsCollection.create({
//     userId,
//     accessToken,
//     refreshToken,
//     accessTokenValidUntil,
//     refreshTokenValidUntil,
//   });
// };

// export const findSession = (accessToken) =>
//   SessionsCollection.findOne({ accessToken });

// export const findUserById = (id) => UsersCollection.findById(id);
