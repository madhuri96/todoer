import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/todos/register', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setRegistrationSuccess(true); // Set registration success
      }
    } catch (error) {
      // Handle error
      setRegistrationSuccess(false); // Reset registration success
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      {registrationSuccess ? (
        <>
          <p>You have successfully registered.</p>
          <button type='button' onClick={handleLoginClick}>
            Go to Login
          </button>
        </>
      ) : (
        <form className='register-form' onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
