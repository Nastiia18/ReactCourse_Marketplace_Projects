import React from 'react';

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search users..."
      />
    </div>
  );
};

export default UserSearch;
