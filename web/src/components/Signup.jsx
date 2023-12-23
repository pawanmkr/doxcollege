import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { setToken } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await registerUser(formData);
    
      if (response.status === 201) {
        const { token } = response.data;
        setToken(token);
        setMessage('Signup Success! Redirecting to the home page');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage('An error occurred during signup. Please try again later.');
      }
    } catch (error) {
      if (error.response?.data) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred during signup. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      <br />
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
