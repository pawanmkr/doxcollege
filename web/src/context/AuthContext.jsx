import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: null,
    userId: null,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        const payload = action.payload;
        const payloadBase64 = payload.split(".")[1];
        const parsedID = JSON.parse(atob(payloadBase64));
        const userId = parsedID.userId;
        return { ...state, token: action.payload, userId };
      case 'CLEAR_TOKEN':
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
