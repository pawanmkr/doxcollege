import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(formData)   // for testing purposes
      const response = await loginUser(formData);

      if (response.status === 201) {
        console.log(response)   // for testing purposes
        const { token } = response.data;
        setToken(token);
        setMessage('Login Success! Redirecting to home page');
        setTimeout(() => {  // dummy timer just for testing purposes...
          navigate('/');
        }, 2000);
      } else {
        setMessage('Email or password is wrong, please try again.');
      }
    } catch (error) {
      if (error.response?.data) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred during signup. Please try again later.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <br />
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleInputChange} />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
