import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [checkName, setCheckName] = useState(false);
  const [login, setLogin] = useState(null);
  const [error, setError] = useState("");
  const signin = (
    username,
    password,
    failCallback = () => {},
    okCallback = () => {}
  ) => {
    fetch("http://localhost:3081/app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "ok") {
          setLogin(null);
          setError(data.body);
          failCallback();
        } else {
          setLogin(data.body);
          setError("");
          okCallback();
        }
      })
      .catch((err) => {
        setLogin(null);
        setError(err);
        failCallback();
      });
  };

  const checkUsername = (username) => {
    fetch(`http://localhost:3081/app/checkUsername/${username}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setCheckName(data.body);
        }
      });
  };

  const registerUser = (
    username,
    password,
    repeated,
    failCallback = () => {},
    okCallback = () => {}
  ) => {
    fetch("http://localhost:3081/app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        repeated: repeated,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "ok") {
          setError(data.body);
          failCallback();
        } else {
          setError("");
          okCallback();
          signin(username, password);
        }
      })
      .catch((err) => {
        setError(err);
        failCallback();
      });
  };
  const signout = (cb = () => {}) => {
    setLogin(null);
    setError("");
    cb();
  };

  return [
    login,
    error,
    signin,
    signout,
    registerUser,
    checkUsername,
    checkName,
  ];
};
