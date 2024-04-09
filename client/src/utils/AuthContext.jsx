import React, { useState, createContext, useContext } from "react";

import axios from "axios";

import Cookies from "js-cookie";
import { toastFail } from "./toasts";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const initialIsLoggedIn = !!accessToken && !!refreshToken;
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  const loginUser = async (email, password) => {
    console.log(email, password);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/auth/login`,
        {
          userEmail: email,
          userPassword: password,
        }
      );

      const { accessToken, refreshToken } = res.data;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      setIsLoggedIn(true);
      return { success: true };
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        toastFail(`${err.response.data.message}`);
      }
      return { success: false, error: err.response };
    }
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) {
        logoutUser();
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/auth/refresh-token`,
        {
          refreshToken,
        }
      );

      const newAccessToken = res.data.accessToken;
      Cookies.set("accessToken", newAccessToken);
    } catch (err) {
      console.error(err);
      logoutUser();
    }
  };

  const logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loginUser, refreshAccessToken, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
