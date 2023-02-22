import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files were uploaded.',
      });
    }
    const files = Object.values(req.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/gif' &&
        file.mimetype !== 'image/webp'
      ) {
        removeTemp(file.tempFilePath);
        return res.status(400).json({
          success: false,
          error: 'File should be JPG, JPEG, PNG, GIF or WEBP',
        });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTemp(file.tempFilePath);
        return res.status(400).json({
          success: false,
          error: 'File should be less than 5MB',
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const removeTemp = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
