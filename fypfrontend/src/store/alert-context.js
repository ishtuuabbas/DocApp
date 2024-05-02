import React, { useState } from "react";

export const AlertContext = React.createContext({
  setSuccess: (msg) => {},
  setError: (msg) => {},
  successMsg: "",
  errorMsg: "",
});

const AlertContextProvider = (props) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const setSuccess = (msg) => {
    setSuccessMsg(msg);

    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const setError = (msg) => {
    setErrorMsg(msg);

    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{ setSuccess, setError, successMsg, errorMsg }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
