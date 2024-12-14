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
    <div className="add-element-container">
      {!isFormOpen ? (
        <button className="open-form-btn" onClick={handleOpenForm}>
          Add User
        </button>
      ) : (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h3>Add New User</h3>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="submit-btn"
              onClick={handleAddUser}
            >
              Add User
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCloseForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddUser;
