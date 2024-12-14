import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import UsersTable from './UserTable';
import useUsersTableStore from '../../hook/useUsersTableStore';

const UserTableContainer = () => {
  const { users, loading, error, handleUserDelete, handleSaveUser } =
    useUsersTableStore();

  return (
    <div>
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
