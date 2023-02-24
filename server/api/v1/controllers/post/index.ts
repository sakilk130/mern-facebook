import { Request, Response } from 'express';
import Post from '../../../../models/Post';

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post(req.body);
    await post.save();
    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
