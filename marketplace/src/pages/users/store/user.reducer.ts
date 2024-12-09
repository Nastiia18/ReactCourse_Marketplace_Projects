import { User } from '../services/UserService';
import { UserAction, UserActionTypes } from './user.actions';

export interface UserState {
  userList: User[];
}

export const initialUserState: UserState = {
  userList: [],
};

export const userReducer = (
  state = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER_LIST:
      return { ...state, userList: action.payload as User[] };

    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.payload),
      };

    case UserActionTypes.UPDATE_USER_NAME:
      const { id, firstName } = action.payload as { id: number; firstName: string };
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === id ? { ...user, name: { ...user.name, firstname: firstName } } : user
        ),
      };

    default:
      return state;
  }
};
