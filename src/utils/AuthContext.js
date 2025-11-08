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

  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const user = await firebaseSignIn(email, password)
      setUser(user);
      return user;
    } catch (e) {
      console.log("Issue in sign-in")
    }
  };

  const signOut = async () => {
    try {
      console.log("Sign out called")
      await firebaseSignOut();
      setUser(null);
    } catch (e) {
      console.log("Sign out error: ", e)
      setUser(null);
    }
  };

  const signUp = async (email, password, _firstName, _lastName) => {
    try {
      const user = await firebaseSignUp(email, password, _firstName, _lastName)
      setUser(user);
      return user;
    } catch (e) {
      console.log("Error in signup: ", e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);