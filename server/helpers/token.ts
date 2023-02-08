import jwt from 'jsonwebtoken';

export const generateToken = (
  payload: string | object | Buffer,
  expired: string
) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expired,
  });
};
