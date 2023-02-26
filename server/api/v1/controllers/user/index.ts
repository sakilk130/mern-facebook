import { Request, Response } from 'express';
import User from '../../../../models/User';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ userName: username }).select(
      '-password'
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
