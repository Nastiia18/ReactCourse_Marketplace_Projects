import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import UsersTable from './UserTable';
import useUsersTableStore from '../../hook/useUsersTableStore';
import AddUser from '../AddUser/AddUser';
import { User } from '../../services/UserService';
import UserSearch from '../search/UserSearch';
import UserTableProvider from '../../context/UserTableProvider';

const UserTableContainer = () => {
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

  const handleUserAdd = (newUser: User) => {
    console.log('New user added:', newUser);
    addUser(newUser);
  };

  return (
    <UserTableProvider>
      <div>
        <AddUser onUserAdd={handleUserAdd} />
        <UserSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {loading && <Loading />} {}
        {error && <ErrorMessage error={error} />} {}
        <UsersTable
          users={users}
          onUserDelete={handleUserDelete}
          onSaveUser={handleSaveUser}
        />
      </div>
    </UserTableProvider>
  );
};

export default UserTableContainer;
