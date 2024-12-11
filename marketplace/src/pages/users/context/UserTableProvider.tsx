import React, { useMemo } from 'react';
import { UserContext, UserDispatchContext } from './user.context';
import { useUsersTableStore } from '../hook/useUsersTableStore';

interface UserTableProviderProps {
  children: React.ReactNode;
}

const UserTableProvider: React.FC<UserTableProviderProps> = ({ children }) => {
  const { userList, loading, error, deleteUser, updateUserName } =
    useUsersTableStore();

  const memoizedValue = useMemo(
    () => ({
      userList,
      loading,
      error,
    }),
    [userList, loading, error]
  );

  const memoizedDispatch = useMemo(
    () => ({
      deleteUser,
      updateUserName,
    }),
    [deleteUser, updateUserName]
  );

  return (
    <UserContext.Provider value={memoizedValue}>
      <UserDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserTableProvider;
