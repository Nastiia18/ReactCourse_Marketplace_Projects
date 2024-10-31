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
      <ul className="users-list">
        {users.map((user) => (
          <li className="user-item" key={user.id}>
            <span className="user-name">
              {user.name.firstname} {user.name.lastname}
            </span>
            <span className="user-email">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
