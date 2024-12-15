import React, { useMemo } from 'react';
import { UserContext, UserDispatchContext } from './user.context';
import { useUsersTableStore } from '../hook/useUsersTableStore';

interface UserTableProviderProps {
  children: React.ReactNode;
}

const UserTableProvider = ({ children }: UserTableProviderProps) => {
  const {
    users,
    loading,
    error,
    handleUserDelete,
    handleSaveUser,
    addUser,
    searchQuery,
    handleSearchChange,
  } = useUsersTableStore();

  const memoizedValue = useMemo(() => {
    return {
      users,
      loading,
      error,
      searchQuery,
    };
  }, [users, loading, error, searchQuery]);

  const memoizedDispatch = useMemo(() => {
    return {
      memoizedAddUser: addUser,
      memoizedDeleteUser: handleUserDelete,
      memoizedSaveUser: handleSaveUser,
      memoizedSearchChange: handleSearchChange,
    };
  }, [addUser, handleUserDelete, handleSaveUser, handleSearchChange]);

  return (
    <UserContext.Provider value={memoizedValue}>
      <UserDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserTableProvider;
