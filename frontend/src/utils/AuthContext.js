import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    console.log("before set user", userData)
    setUser(userData);
    console.log("after set suer", user)
  };

  useEffect(() => {
    console.log("LOG After setUser", user);
  }, [user]);

 

  console.log("LOG Authuser", user);
 
  console.log("Authuser", user)
  return (
    <AuthContext.Provider value={{ user, updateUser}}>
      {children}
    </AuthContext.Provider> 
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};