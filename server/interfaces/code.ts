import { Types } from 'mongoose';

export interface ICode {
  code: string;
  user: Types.ObjectId;
}
