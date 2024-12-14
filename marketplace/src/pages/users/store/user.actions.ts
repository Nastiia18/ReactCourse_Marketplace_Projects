import { User } from "../services/UserService";

export type UserActionPayloadTypes =
  | User[]
  | User
  | number
  | { id: number; firstName: string };

export interface UserAction {
  type: UserActionTypes;
  payload: UserActionPayloadTypes;
}

export enum UserActionTypes {
  SET_USER_LIST = "SET_USER_LIST",
  ADD_USER = "ADD_USER",
  UPDATE_USER_NAME = "UPDATE_USER_NAME",
  DELETE_USER = "DELETE_USER",
}

export const setUserListAction = (users: User[]): UserAction => {
  return {
    type: UserActionTypes.SET_USER_LIST,
    payload: users,
  };
};

export const addUserAction = (user: User): UserAction => {
  return {
    type: UserActionTypes.ADD_USER,
    payload: user,
  };
};

export const updateUserNameAction = (
  id: number,
  firstName: string
): UserAction => {
  return {
    type: UserActionTypes.UPDATE_USER_NAME,
    payload: { id, firstName },
  };
};

export const deleteUserAction = (id: number): UserAction => {
  return {
    type: UserActionTypes.DELETE_USER,
    payload: id,
  };
};
