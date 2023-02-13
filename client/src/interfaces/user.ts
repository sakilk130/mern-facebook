export interface IUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    verified: boolean;
    picture: string;
  };
  token?: string;
}
