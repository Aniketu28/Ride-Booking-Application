import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

  const [AuthUser , setAuthUser ] = useState(false);
  const [user, setUser ] = useState(null);
  const [captain, setCaptain] = useState(null);

  useEffect(() => {

    const token = Cookies.get('token');  

    if (token) {
      setAuthUser(true);
      getUser(setUser);
      getCaptain(setCaptain);
    } else {
      setAuthUser (false);
      setUser (null);
      setCaptain(null);
    }
  }, [AuthUser,Cookies.get('token')]); 

  return (
    <AuthContext.Provider value={{ AuthUser , setAuthUser , user, captain }}>
      {children}
    </AuthContext.Provider>
  );
};

const getUser  = async (setUser) => {
  try {
    const token = Cookies.get('token'); 

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUser(response.data);

  } catch (e) {
    console.error('Error fetching user profile:', e);
    setUser (null);
  }
};

const getCaptain = async (setCaptain) => {
  try {
    const token = Cookies.get('token');  
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCaptain(response.data); 

  } catch (e) {
    console.error('Error fetching captain profile:', e);
    setCaptain(null); 
  }
};

export const isAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;