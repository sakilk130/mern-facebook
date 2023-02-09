export enum UserActionEnum {
  LOGIN = 'LOGIN',
}

export type UserActionTypes = {
  type: UserActionEnum.LOGIN;
  payload: unknown;
};
