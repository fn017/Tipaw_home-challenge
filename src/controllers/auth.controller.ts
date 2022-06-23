// @ts-nocheck
import httpStatus from "http-status";
import { authService, userService, tokenService } from "../services";

const register = async (_parent, args, _context, _info) => {
  const user = await userService.createUser(args);
  const tokens = await tokenService.generateAuthTokens(user);
  console.log(user, tokens);
  return { user, tokens };
};

const login = async (_parent, args, _context, _info) => {
  const { email, password } = args;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return { user, tokens };
};

const logout = async (_parent, args, _context, _info) => {
  await authService.logout(args.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
};

const refreshTokens = async (_parent, args, _context, _info) => {
  const { user, tokens } = await authService.refreshAuth(args.refreshToken);
  res.status(httpStatus.OK).send({ user, tokens });
};

export default {
  register,
  login,
  logout,
  refreshTokens,
};
