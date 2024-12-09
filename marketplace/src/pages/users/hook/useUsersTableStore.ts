import { useCallback, useEffect, useReducer, useState } from 'react';
import { AxiosError } from 'axios';
import { User, UserService } from '../services/UserService';
import { userReducer, initialUserState } from '../store/user.reducer';
import {
  deleteUserAction,
  setUserListAction,
  updateUserNameAction,
} from '../store/user.actions';

export const useUsersTableStore = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userService = new UserService();
        const users = await userService.getAllUsers();
        dispatch(setUserListAction(users));
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await new UserService().deleteUserById(id);
      dispatch(deleteUserAction(id));
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserName = (id: number, firstName: string) => {
    dispatch(updateUserNameAction(id, firstName));
  };

  return {
    userList: state.userList,
    loading,
    error,
    deleteUser,
    updateUserName,
  };
};

export default useUsersTableStore;
