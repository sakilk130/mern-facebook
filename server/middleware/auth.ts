import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { AuthUser } from '../interfaces/user';
import jwt from 'jsonwebtoken';
dotenv.config();

export interface RequestWithUser extends Request {
  user?: AuthUser;
}

export const auth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token not found!');
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        throw new Error('Authentication failed!');
      }
      req.user = user as AuthUser;
    });
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
