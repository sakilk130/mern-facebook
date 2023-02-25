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

export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('user', 'firstName lastName gender userName picture')
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
