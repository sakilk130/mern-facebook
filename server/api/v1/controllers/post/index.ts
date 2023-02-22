import { Request, Response } from 'express';

export const createPost = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
