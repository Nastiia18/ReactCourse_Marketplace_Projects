import { useCallback, useEffect, useReducer, useState } from "react";
import { User, UserService } from "../services/UserService";
import { AxiosError } from "axios";
import { initialUserState, userReducer } from "../store/user.reducer";
import { deleteUserAction, setUserListAction, updateUserNameAction } from "../store/user.actions";

export const useUsersTableStore = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

/*const [users, setUsers] = useState<User[]>([]);*/
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
  const abortController = new AbortController();
  const userService = new UserService(abortController.signal);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedUsers = await userService.getAllUsers();
      dispatch(setUserListAction(fetchedUsers));
    } catch (err) {
      setError((err as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };


  fetchUsers();
  return () => abortController.abort();
}, []);


const handleUserDelete = useCallback(async (id: number) => {
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


const handleSaveUser = useCallback((id: number, firstName: string) => {
  dispatch(updateUserNameAction(id, firstName));
},
[]
);

return {
  users: state.users,
  loading,
  error,
  handleUserDelete,
  handleSaveUser,
};
};

export default useUsersTableStore;
