export interface IComment {
  comment: string;
  image: string;
  commentBy: string;
  commentAt: string;
}

export interface IPost {
  _id: string;
  type: string | null;
  text: string | null;
  images: string[] | null;
  user: string;
  background: string | null;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}
