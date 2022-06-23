import { ApiError } from "../utils";
import httpStatus from "http-status";

import jwt from "jsonwebtoken";
import { config } from "../config";
const AuthRoutes = ["login", "register"];

const verifySecurityHeader = (header) => {
  try {
    const accessToken = header.split(" ")[1];

    const result = jwt.verify(accessToken, config.jwt.secret);
    console.log(result);
    return !!result;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const auth = (req, _res, next) => {
  const operationName = req.body.operationName;
  if (AuthRoutes.includes(operationName)) {
    next();
    return;
  }

  const isVerified = verifySecurityHeader(req.headers.authorization);

  if (isVerified) {
    next();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default auth;
