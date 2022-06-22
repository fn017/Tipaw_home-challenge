import { Request, Response } from "express";

// interface ICatchAsyncFunc {
//   fn: (req: Request, res: Response, next?: NextFunction) => Promise<>;
// }

const catchAsync = (fn: any) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
