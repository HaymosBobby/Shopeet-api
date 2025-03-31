import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { throwError } from "../util/helper";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      throwError(e.errors[0].message, 400);
    }
  };

export default validateResource;
