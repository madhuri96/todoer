import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/todos/login', {
        email,
        password,
      });

      console.log(response);

      if (true) {
        //response.data.status === 200
        const token = response.data.data.token;
        console.log(token);
        localStorage.setItem('token', token);

        // Redirect to home page after successful login
        history('/home');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  return (
    <div className='login-container'>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form className='login-form' onSubmit={handleLogin}>
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
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
