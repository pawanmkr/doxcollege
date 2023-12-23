import React, { createContext, useContext, useReducer} from 'react';

const AuthContext = createContext();

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: getCookie('jwtToken') || null,
    userId: null,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        const payload = action.payload;
        const payloadBase64 = payload.split(".")[1];
        const parsedID = JSON.parse(atob(payloadBase64));
        const userId = parsedID.userId;
        // Set the cookie when the token is set
        document.cookie = `jwtToken=${encodeURIComponent(payload)};max-age=${7 * 24 * 60 * 60};path=/`;
        return { ...state, token: action.payload, userId };
      case 'CLEAR_TOKEN':
        // Clear the cookie when the token is cleared
        document.cookie = 'jwtToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        return { ...state, token: null, userId: null };
      default:
        return state;
    }
  }, initialState);


  const setToken = (newToken) => {
    dispatch({ type: 'SET_TOKEN', payload: newToken });
  };

  const clearToken = () => {
    dispatch({ type: 'CLEAR_TOKEN' });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, userId: state.userId, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
