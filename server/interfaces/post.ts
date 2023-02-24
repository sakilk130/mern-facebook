import { ProfilePictureEnum } from '../enums/picture';
import {
  AnyArray,
  SchemaTypeOptions,
  StringSchemaDefinition,
  Types,
} from 'mongoose';

export interface IComment {
  comment: string;
  image: string;
  commentBy: Types.ObjectId;
  commentAt: Date;
}

export interface IPost {
  type: [
    ProfilePictureEnum.ProfilePicture,
    ProfilePictureEnum.CoverPicture,
    null
  ];
  text: string;
  images:
    | AnyArray<StringSchemaDefinition>
    | AnyArray<SchemaTypeOptions<string>>
    | undefined;
  user: Types.ObjectId;
  background: string;
  comments: IComment[];
}
