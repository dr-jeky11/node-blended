import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const userByEmail = (email) => UsersCollection.findOne({ email });

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};
