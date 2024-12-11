import UserTable from './UserTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import useUsersTableStore from '../../hook/useUsersTableStore';
import UserTableProvider from '../../context/UserTableProvider';
const UserTableContainer = () => {
  const { userList, loading, error, deleteUser, updateUserName } =
    useUsersTableStore();

  return (
    <UserTableProvider>
      <div>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <UserTable
          users={userList}
          onUserDelete={deleteUser}
          onSaveUser={(firstName, id) => updateUserName(firstName, id)}
        />
      </div>
    </UserTableProvider>
  );
};

export default UserTableContainer;
