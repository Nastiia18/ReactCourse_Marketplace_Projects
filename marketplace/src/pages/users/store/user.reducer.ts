import { User } from "../services/UserService";
import { UserAction, UserActionTypes } from "./user.actions";

export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: [],
};

export const userReducer = (
  state = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER_LIST: {
      return {
        ...state,
        users: action.payload as User[],
      };
    }
    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case UserActionTypes.UPDATE_USER_NAME: {
      const payload = action.payload as { id: number; firstName: string };

      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === payload.id) {
            return {
              ...user,
              name: { ...user.name, firstname: payload.firstName },
            };
          }
          return user;
        }),
      };
    }
    case UserActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload as User],
      };
    default:
      return state;
  }
};
