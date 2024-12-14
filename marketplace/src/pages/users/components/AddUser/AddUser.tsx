import React, { useState } from 'react';
import { User } from '../../services/UserService';

interface AddUserProps {
  onUserAdd: (newUser: User) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdd }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleAddUser = () => {
    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields.');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const newUser: User = {
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      address: {
        city,
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '',
          long: '',
        },
      },
      phone,
      id: 0,
      username: '',
    };

    onUserAdd(newUser);
    handleCloseForm();
    clearForm();
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setCity('');
    setPhone('');
  };
  return (
    <div>
      {!isFormOpen ? (
        <button onClick={handleOpenForm}>Add User</button>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Add New User</h3>

          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleAddUser}>
            Add User
          </button>
          <button type="button" onClick={handleCloseForm}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddUser;
