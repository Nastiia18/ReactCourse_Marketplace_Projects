import { memo } from 'react';
import { User } from '../../services/UserService';
import UserTableRow from './UserTableRow';

interface UsersTableProps {
  users: User[];
  onUserDelete: (id: number) => void;
  onSaveUser: (id: number, firstName: string) => void;
}

const UsersTableComponent: React.FC<UsersTableProps> = ({
  users,
  onUserDelete,
  onSaveUser,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            onUserDelete={onUserDelete}
            onSaveUser={onSaveUser}
          />
        ))}
      </tbody>
    </table>
  );
};

export default memo(UsersTableComponent);
