import React, { useCallback, useState } from "react";

export const useHttpHook = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        setSuccess(responseData.message);
        return responseData;
      } catch (err) {
        setError(err.message || "Something went wrong!");
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  const clearSuccess = () => {
    setSuccess(null);
  };

  return { isLoading, error, success, sendRequest, clearError, clearSuccess };
};
