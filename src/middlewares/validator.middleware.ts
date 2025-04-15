import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class validateMiddleware {
  static validateSchema(schema: ZodSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await schema.parseAsync(req.body);
        next();
      } catch (error: any) {
        res.status(400).json({
          errors: error.errors.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
    };
  }
}
