import Cookies from 'js-cookie';
import { UserActionTypes, UserActionEnum } from './types';

const initialState = Cookies.get('user')
  ? JSON.parse(Cookies.get('user')!)
  : null;

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
