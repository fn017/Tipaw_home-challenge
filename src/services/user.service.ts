import httpStatus from "http-status";
// import { User } from '../models';
import ApiError from "../utils/ApiError";
import { prisma } from "../config";

import { v4 as uuid } from "uuid";
const bcrypt = require("bcryptjs");

/**
 * Create a user
 */
const createUser = async (userBody) => {
  const { firstName, lastName, email, password } = userBody;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      id: uuid(),
    },
  });

  return user;
};

/**
 * Query for users
 */
const queryUsers = async (_filter, _options) => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Get user by id
 */
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Check if email is taken by another user
 */
const isEmailTaken = async (email, userId) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
      NOT: {
        id: userId,
      },
    },
  });
};

/**
 * Update user by id
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, user.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  // await user.save();
  return user;
};

/**
 * Delete user by id
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return deletedUser;
};

export default {
  createUser,
  queryUsers,
  isEmailTaken,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
