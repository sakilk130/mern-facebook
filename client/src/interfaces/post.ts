import { ProfilePictureEnum } from '../enums/picture';
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  verified: boolean;
  picture: string;
}

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
