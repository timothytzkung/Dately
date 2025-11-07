import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = userState(false);

  const checkLoggedInStatus = async() => {
    const user = await getData('user');
    setIsLoggedIn(true);
  }

  const signIn = async (email, password) => {
    // TODO: Replace with Firebase authentication
    setUser({ email });
  };

  const signOut = async () => {
    // TODO: Replace with Firebase signOut
    setUser(null);
  };

  const signUp = async (email, password) => {
    // TODO: Replace with Firebase createUser
    setUser({ email });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);