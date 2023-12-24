import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserId = localStorage.getItem('userId') || null;

  const initialState = {
    token: localStorage.getItem('jwtToken') || null,
    userId: initialUserId,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        const payload = action.payload;
        const payloadBase64 = payload.split(".")[1];
        const parsedID = JSON.parse(atob(payloadBase64));
        const userId = parsedID.userId;

        localStorage.setItem('jwtToken', payload);
        localStorage.setItem('userId', userId);

        return { ...state, token: action.payload, userId };
      case 'CLEAR_TOKEN':
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');

        return { ...state, token: null, userId: null };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    // You can add any side effect related to the token change here if needed
  }, [state.token]);

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
