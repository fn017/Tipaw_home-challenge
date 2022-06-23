import { ApiResponse } from "../utils";
import { userService } from "../services";

const createUser = async (_parent, args, _context, _info) => {
  console.log("createUser, success", args);
};

const getUser = async (_parent, args, _context, _info) => {
  const user = await userService.getUserById(args.userId);
  return user;
};

const getUsers = async (_parent, _args, _req, _gql) => {
  try {
    const users = await userService.queryUsers({}, {});
    return users;
  } catch (err: any) {
    throw ApiResponse(err);
  }
};

const updateUser = async (_parent, args, _context, _info) => {
  const user = await userService.updateUserById(args.userId, args.updateBody);
  return user;
};

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
};
