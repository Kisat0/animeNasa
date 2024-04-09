import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { toastFail } from "./toasts";

import axios from "axios";
import { useAuth } from "./AuthContext";
import { Loader } from "./Loader";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("accessToken");
  const { isLoggedIn, refreshAccessToken } = useAuth();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let currentAccessToken = accessToken;

        if (!currentAccessToken) {
          await refreshAccessToken();
          currentAccessToken = Cookies.get("accessToken");
        }

        if (currentAccessToken) {
          const res = await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/auth/user`,
            {
              accessToken: currentAccessToken,
            }
          );
          setUser(res.data);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        if (
          err.response.status === 401 &&
          err.response.data.message === "Token expired"
        ) {
          await refreshAccessToken();
          setRefresh(!refresh);
        } else {
          toastFail("Une erreur s'est produite.");
          setLoading(false);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [accessToken, isLoggedIn, refreshAccessToken, refresh]);

  if (loading && isLoggedIn) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ user }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
