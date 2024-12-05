import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import { User, UserService } from '../../services/UserService';
import UsersTable from './UserTable';

const UserTableContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
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
        setUsers(fetchedUsers);
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

      setUsers((prev) => prev.filter((user) => user.id !== id));

      setLoading(false);
    } catch (error) {
      setError((error as AxiosError).message);
      setLoading(false);
    }
  }, []);

  const handleSaveUser = useCallback((id: number, firstName: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, name: { ...user.name, firstname: firstName } }
          : user
      )
    );
  }, []);

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
