import { UserActionTypes, UserActionEnum } from './types';

const initialState = null;

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
