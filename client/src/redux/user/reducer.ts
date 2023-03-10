import Cookies from 'js-cookie';
import { IUser } from '../../interfaces/user';
import { UserActionTypes, UserActionEnum } from './types';

const initialState: IUser = Cookies.get('user')
  ? JSON.parse(Cookies.get('user')!)
  : null;

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return action.payload;
    case UserActionEnum.VERIFY:
      return {
        ...state,
        user: {
          ...state.user,
          verified: action.payload,
        },
      };
    case UserActionEnum.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
