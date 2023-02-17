export enum UserActionEnum {
  LOGIN = 'LOGIN',
  VERIFY = 'VERIFY',
}

export type UserActionTypes =
  | {
      type: UserActionEnum.LOGIN;
      payload: unknown;
    }
  | {
      type: UserActionEnum.VERIFY;
      payload: boolean;
    };
