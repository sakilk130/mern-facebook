import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export const RequestValidator =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    // FIXME: type check
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let errors: Record<string, string[]> = {};
        //FIXME: type check
        error.inner.forEach((err: any) => {
          if (err?.path) {
            errors[err?.path] = err.errors;
          }
        });
        return res.status(400).json({
          success: false,
          error: errors,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  };
