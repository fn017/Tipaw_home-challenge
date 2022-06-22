import { Response, Request } from "express";
import httpStatus from "http-status";
import { userService } from "../services";

import catchAsync from "../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log("createUser, success", req);
  res.status(httpStatus.OK).send("createUser");
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).send(user);
});

const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await userService.queryUsers({}, {});
  res.status(httpStatus.OK).send(users);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).send(user);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send(user);
});

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
