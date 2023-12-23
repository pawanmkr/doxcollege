import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, } from '../context/AuthContext';
import Search from './Search';

const Navbar = () => {
  const { token, clearToken } = useAuth();
  const handleLogout = () => {
    clearToken();
  };

  return (
    <div className="navigations">
      <div className="nav-menus">
        <Link to={'/'} className='nav-item dxc icon'>Doxcollege</Link>

        {token ? (
          <>
            <Link to={'/profile'} className='nav-item'> <strong>Profile</strong> </Link>
            <Link to={'/upload'} className='nav-item'> <strong>Upload</strong> </Link>
            <Link to={'/'} className='nav-item'  onClick={handleLogout}> <strong>Logout</strong> </Link>
          </>
        ) : (
          <>
            <Link to={'/login'} className='nav-item'> <strong>Login</strong> </Link>
            <Link to={'/signup'} className='nav-item'> <strong>Signup</strong> </Link>
          </>
        )}

      </div>
      <Search />
    </div>
  );
};

export default Navbar;


