import { AnyArray, SchemaTypeOptions, StringSchemaDefinition } from 'mongoose';

export interface AuthUser {
  id: string;
  iat: number;
  exp: number;
}
export interface DOB {
  bDate: number;
  bMonth: number;
  bYear: number;
}

export interface Details {
  bio: string;
  otherNames: string;
  job: string;
  workPlace: string;
  highSchool: string;
  collage: string;
  currentCity: string;
  homeTown: string;
  relationship: string;
  instagram: string;
}
export interface SavedPosts {
  post: string;
  savedAt: Date;
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  picture: string;
  cover: string;
  gender: string;
  dob: DOB;
  verified: boolean;
  friends:
    | AnyArray<StringSchemaDefinition>
    | AnyArray<SchemaTypeOptions<string>>
    | undefined;
  following:
    | AnyArray<StringSchemaDefinition>
    | AnyArray<SchemaTypeOptions<string>>
    | undefined;
  followers:
    | AnyArray<StringSchemaDefinition>
    | AnyArray<SchemaTypeOptions<string>>
    | undefined;

  requests: AnyArray<StringSchemaDefinition> | undefined;
  search: AnyArray<StringSchemaDefinition> | undefined;
  details: Details;
  savedPosts: SavedPosts[];
}
