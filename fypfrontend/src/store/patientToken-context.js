import React, { useState, useEffect } from "react";

export const PatientTokenContext = React.createContext({
  tokenCounter: 1,
  incrementTokenCounter: () => {},
  resetPatientToken: () => {},
});

const PatientTokenContextProvider = (props) => {
  const storedToken = localStorage.getItem("patientToken");
  const initialToken = storedToken ? parseInt(storedToken, 10) : 1;

  const [tokenCounter, setTokenCounter] = useState(initialToken);

  const incrementTokenCounter = () => {
    setTokenCounter((prevCounter) => prevCounter + 1);
  };

  const resetPatientToken = () => {
    setTokenCounter(1);
  };

  useEffect(() => {
    localStorage.setItem("patientToken", tokenCounter.toString());
  }, [tokenCounter]);

  return (
    <PatientTokenContext.Provider
      value={{ tokenCounter, incrementTokenCounter, resetPatientToken }}
    >
      {props.children}
    </PatientTokenContext.Provider>
  );
};

export default PatientTokenContextProvider;
