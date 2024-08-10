import React, { useState } from 'react';
import axios from 'axios';
import './SignUpLogin.css';  // Link to the external CSS file

const SignUpLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e, action) => {
    e.preventDefault();
    
    const url = action === 'signup' 
      ? 'http://localhost:3001/api/signup' 
      : 'http://localhost:3001/api/login';

    axios.post(url, { username, password })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setMessage('The username or Password you entered is wrong!');
      });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  return (
    <div className="container mt-5">
      <h2>Login to your account</h2>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type={passwordVisible ? "text" : "password"}  // Modify this line
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        
        </div>
        <div className="button-container">
          <button 
            type="button" 
            className="btn btn-primary signup-btn" 
            onClick={(e) => handleSubmit(e, 'signup')}
          >
            Sign Up
          </button>
          <button 
            type="button" 
            className="btn btn-secondary login-btn" 
            onClick={(e) => handleSubmit(e, 'login')}
          >
            Login
          </button>
        </div>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default SignUpLogin;
