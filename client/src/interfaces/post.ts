import { ProfilePictureEnum } from '../enums/picture';
import { User } from './user';

export interface IComment {
  comment: string;
  image: string;
  commentBy: string;
  commentAt: string;
}

export interface IPost {
  _id: string;
  type: ProfilePictureEnum | null;
  text: string | null;
  images: string[] | null;
  user: User | string;
  background: string | null;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}
