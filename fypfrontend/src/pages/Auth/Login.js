import React, { useContext } from "react";
import SignupForm from "../../components/Auth/SignupForm";
import { useState } from "react";
import { AuthContext } from "../../store/auth-context";
import Error from "../../UI/Error";
import Success from "../../UI/Success";
import { AlertContext } from "../../store/alert-context";
import logo from "../../assets/logo.png";
import { BASE_URL } from "../../constant/url";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        BASE_URL+"/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      authCtx.login(responseData.user, responseData.token);
      alertCtx.setSuccess(responseData.message);
    } catch (err) {
      alertCtx.setError(err.message || "Email or Password Is Incorrect!");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "#F7F7F7",
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {alertCtx.successMsg && !alertCtx.errorMsg && (
        <Success msg={alertCtx.successMsg} />
      )}
      {alertCtx.errorMsg && !alertCtx.successMsg && (
        <Error msg={alertCtx.errorMsg} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
     
        <img width={200} height={150} src={logo} alt="logo" />
      </div>

      <SignupForm onSubmitLoginData={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default Login;
