import httpStatus from "http-status";
import { tokenService, userService } from "./";
import ApiError from "../utils/ApiError";
import bcrypt from "bcryptjs";
import { token } from "../config/";

/**
 * Login with username and password
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Logout
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await tokenService.getToken({
    token: refreshToken,
    type: token.tokenTypes.REFRESH,
  });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  // await refreshTokenDoc.remove();
  await tokenService.deleteTokenById(refreshTokenDoc.id);
};

/**
 * Refresh auth tokens
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      token.tokenTypes.REFRESH
    );
    console.log("refreshTokenDoc", refreshTokenDoc);
    const user = await userService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }

    await tokenService.deleteTokenById(refreshTokenDoc.id);
    const tokens = await tokenService.generateAuthTokens(user);
    console.log(tokens);
    return {
      user,
      tokens,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Authentication failed, please login again"
    );
  }
};

export default {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
