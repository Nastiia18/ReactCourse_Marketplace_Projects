import React, { memo } from 'react';

interface UserTitleInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserTitleInputComponent: React.FC<UserTitleInputProps> = ({
  value,
  onChange,
}) => <input type="text" value={value} onChange={onChange} />;

export default memo(UserTitleInputComponent);
