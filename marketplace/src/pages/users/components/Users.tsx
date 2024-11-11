// src/pages/users/Users.tsx
import { useState, useEffect } from 'react';
import { User, UserService } from '../services/UserService';
import { AxiosError } from 'axios';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const userService = new UserService(signal);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedUsers = await userService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>} {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.firstname}</td>
              <td>{user.name.lastname}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
