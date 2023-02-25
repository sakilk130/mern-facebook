export interface IUser {
  user: User;
  token?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  verified: boolean;
  picture: string;
}
