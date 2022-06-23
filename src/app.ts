// @ts-nocheck
import express from "express";
import helmet from "helmet";
import compression from "compression";
import httpStatus from "http-status";
import cors from "cors";
import passport from "passport";
import { Application, Request, Response, NextFunction } from "express";

import { ApiError } from "./utils";
import { config, corsOptions, morgan, jwtPassport } from "./config";
import { auth, authLimiter } from "./middleware";
import { errorConverter, errorHandler } from "./middleware/error";
import { graphqlHTTP } from "express-graphql";

// import routes from "./routes/api/index";

import schema from "./graphql";
import {
  execute,
  GraphQLError,
  UniqueOperationNamesRule,
  ValidationContext,
} from "graphql";
import { DisallowNoOperationName } from "./graphql/validations";

const app: Application = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet()); // NOTE graphql gives error

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
// if (config.env === "production") {
//   app.use((req, res, next) => {
//     if (req.body.operationName === "auth") {
//       console.log("auth");
//       authLimiter(req, res, next);
//     }
//     next();
//   });
// }

app.use(auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    validationRules: [DisallowNoOperationName],
    // async customExecuteFn(args) {
    //   const result = await execute(args);
    //   if (args.operationName === "IntrospectionQuery") return result;
    //   const operationResult = result.data[args.operationName];
    //   if (!operationResult || operationResult.status.code >= 400) {
    //     throw new GraphQLError(
    //       operationResult.status.message || "Something went wrong"
    //     );
    //   }
    //   return result;
    // },
  })
);

// v1 api routes
// app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.url !== "/graphql") {
    next(new ApiError(httpStatus.NOT_FOUND, "api Not found"));
  }
  next();
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
