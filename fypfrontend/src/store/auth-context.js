import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

let logoutTimer;

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const login = useCallback((user, token, expirationDate) => {
    setToken(token);
    setUser(user);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: user,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    navigate("/");
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.clear();
    navigate("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token,
         new Date(storedData.expiration));
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user: user,
        login: login,
        logout: logout,
        token: token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
