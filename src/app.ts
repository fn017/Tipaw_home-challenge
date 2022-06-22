import express from "express";
import helmet from "helmet";
import compression from "compression";
import httpStatus from "http-status";
import cors from "cors";
import passport from "passport";

import { Application, Request, Response, NextFunction } from "express";

import { ApiError } from "./utils";
import { config, corsOptions, morgan, jwtPassport } from "./config";
import { authLimiter } from "./middleware";
import { errorConverter, errorHandler } from "./middleware/error";

import routes from "./routes/api/index";

const app: Application = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors(corsOptions));
// app.options('*', cors);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtPassport.jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "api Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
