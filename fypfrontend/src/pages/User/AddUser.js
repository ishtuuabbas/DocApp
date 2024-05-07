import React, { Fragment, useContext } from "react";
import AddUserForm from "../../components/User/AddUserForm";
import { useState } from "react";
import { AlertContext } from "../../store/alert-context";
import { AuthContext } from "../../store/auth-context";
import { Container } from "@mui/material";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const addUserHandler = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify(data),
        },
      );
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      alertCtx.setSuccess(responseData.message);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="md">
      <AddUserForm onSubmitUserData={addUserHandler} isLoading={isLoading} />
    </Container>
  );
};

export default AddUser;
