import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    userName: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    userName: 'user',
    password: 'user',
    role: 'user',
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserName(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = users.find((user) => user.userName === userName);

    if (!user) {
      alert('User does not exist');
      return;
    }

    if (user.password !== password) {
      alert('Invalid password');
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    navigate(user.role === 'admin' ? '/users' : '/');
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userName}
              onChange={handleUserNameInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordInputChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
