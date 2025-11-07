import React, { createContext, useState, useContext, useEffect } from 'react';
import { getData, removeData } from './storage';
import { signIn as firebaseSignIn, signUp as firebaseSignUp, signOut as firebaseSignOut } from './firebaseService';

const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoggedInStatus = async() => {
    try {
      const user = await getData('user');
      setIsLoggedIn(true);
    } catch(e) {
      console.log("Error fetching user", e);
    }
  }

  const signIn = async (email, password) => {
    const user = await firebaseSignIn(email, password)
    setUser(user);
  };

  const signOut = async () => {
    await firebaseSignOut();
    setUser(null);
  };

  const signUp = async (email, password) => {
    const user = await firebaseSignUp(email, password)
    setUser(user);
  };

  // Check on mount
  useEffect(() => {
    checkLoggedInStatus();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);