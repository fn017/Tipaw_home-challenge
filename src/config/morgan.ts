import { Request, Response } from "express";
import morgan from "morgan";
import config from "./config";
import logger from "./logger";

morgan.token("message", (_req: Request, res: Response) => {
  return res.locals.errorMessage || "";
});
morgan.token(
  "operation",
  (req: Request, _res: Response) => req.body.operationName || ""
);

const getIpFormat = () =>
  config.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :operation :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :operation :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export = {
  successHandler,
  errorHandler,
};
