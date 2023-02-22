import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { removeTemp } from '../../../../middleware/ImageUpload';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const { path } = req.body;
    if (!req?.files) {
      throw new Error('No files were uploaded.');
    }
    let files: any = Object.values(req.files).flat();
    let images: any = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const uploadToCloudinary = async (file: any, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, result) => {
        if (err) {
          removeTemp(file.tempFilePath);
          reject(err);
        } else {
          resolve(result?.secure_url);
        }
      }
    );
  });
};
