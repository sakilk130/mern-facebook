export enum UserActionEnum {
  LOGIN = 'LOGIN',
  VERIFY = 'VERIFY',
  LOGOUT = 'LOGOUT',
}

export type UserActionTypes =
  | {
      type: UserActionEnum.LOGIN;
      payload: unknown;
    }
  | {
      type: UserActionEnum.VERIFY;
      payload: boolean;
    }
  | {
      type: UserActionEnum.LOGOUT;
    };
