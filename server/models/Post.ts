import { ProfilePictureEnum } from '../enums/picture';
import { model, Schema } from 'mongoose';
import { IPost } from '../interfaces/post';

const PostSchema = new Schema<IPost>(
  {
    type: {
      type: String,
      enum: [
        ProfilePictureEnum.ProfilePicture,
        ProfilePictureEnum.CoverPicture,
        null,
      ],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        commentAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
