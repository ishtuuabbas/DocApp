import { useState, useEffect } from "react";

const useInternetConnectivity = () => {
  const [status, setStatus] = useState(() => {
    if (navigator.onLine) {
      console.log("Connected to network.");
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    window.ononline = (e) => {
      console.log("Connected to network.");
      setStatus(true);
    };
    window.onoffline = (e) => {
      console.log("Network connection lost.");
      setStatus(false);
    };
  }, [status]);
  return status;
};

export default useInternetConnectivity;
