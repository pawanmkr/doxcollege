import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/apiService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(formData)
      const response = await loginUser(formData);

      if (response.status === 201) {
        console.log(response)
        const { token } = response.data;
        setToken(token);
        console.log("success");
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
