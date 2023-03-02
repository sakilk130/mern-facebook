import { Request, Response } from 'express';
import User from '../../../../models/User';
import Post from '../../../../models/Post';
import { RequestWithUser } from '../../../../interfaces/user';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ userName: username })
      .select('-password')
      .lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    const posts = await Post.find({
      user: profile._id,
    }).populate('user', '-password');

    return res.status(200).json({
      success: true,
      data: {
        ...profile,
        posts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProfilePicture = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'No image provided',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      {
        profilePicture: url,
      },
      { new: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      data: user,
      message: 'Profile picture updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
