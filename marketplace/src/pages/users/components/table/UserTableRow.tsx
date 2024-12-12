import { memo, useState } from 'react';
import { User } from '../../services/UserService';
import UserTitleInput from './UserTitleInput';
import { useRenderCount } from '../../../../hooks/useRenderCount';

interface UserTableRowProps {
  user: User;
  onUserDelete: (id: number) => void;
  onSaveUser: (id: number, firstName: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onUserDelete,
  onSaveUser,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.name.firstname);
  const renderCount = useRenderCount();

  const handleSave = () => {
    onSaveUser(user.id, firstName);
    setIsEditMode(false);
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>
        {isEditMode ? (
          <UserTitleInput
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        ) : (
          user.name.firstname
        )}
      </td>
      <td>{user.name.lastname}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.phone}</td>
      <td>
        {isEditMode ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditMode(true)}>Edit</button>
            <button onClick={() => onUserDelete(user.id)}>Delete</button>
          </>
        )}
      </td>
      <td>{renderCount}</td>
    </tr>
  );
};

export default memo(UserTableRow);
