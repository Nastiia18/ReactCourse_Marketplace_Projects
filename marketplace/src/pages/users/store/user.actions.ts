import { User } from '../services/UserService';

export type UserActionPayloadTypes = User[] | User | number | { id: number; firstName: string };

export interface UserAction {
  type: UserActionTypes;
  payload: UserActionPayloadTypes;
}

export enum UserActionTypes {
  SET_USER_LIST = 'SET_USER_LIST',
  DELETE_USER = 'DELETE_USER',
  UPDATE_USER_NAME = 'UPDATE_USER_NAME',
}

export const setUserListAction = (users: User[]): UserAction => ({
  type: UserActionTypes.SET_USER_LIST,
  payload: users,
});

export const deleteUserAction = (id: number): UserAction => ({
  type: UserActionTypes.DELETE_USER,
  payload: id,
});

export const updateUserNameAction = (id: number, firstName: string): UserAction => ({
  type: UserActionTypes.UPDATE_USER_NAME,
  payload: { id, firstName },
});
