import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import UsersTable from './UserTable';
import useUsersTableStore from '../../hook/useUsersTableStore';
import AddUser from '../AddUser/AddUser';
import { User } from '../../services/UserService';
import UserSearch from '../search/UserSearch';

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
    <div>
      <AddUser onUserAdd={handleUserAdd} />
      <UserSearch
        searchQuery={searchQuery} // Передаємо значення пошукового запиту
        onSearchChange={handleSearchChange} // Передаємо функцію для обробки зміни
      />
      {loading && <Loading />} {}
      {error && <ErrorMessage error={error} />} {}
      <UsersTable
        users={users}
        onUserDelete={handleUserDelete}
        onSaveUser={handleSaveUser}
      />
    </div>
  );
};

export default UserTableContainer;
