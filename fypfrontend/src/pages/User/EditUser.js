import React, { Fragment, useContext, useEffect } from "react";
import AddUserForm from "../../components/User/AddUserForm";
import { useState } from "react";
import { AlertContext } from "../../store/alert-context";
import { useParams } from "react-router-dom";
import NewSpinner from "../../UI/NewSpinner";
import { AuthContext } from "../../store/auth-context";

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldUser, setOldUser] = useState({});

  const alertCtx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://doctorapp-gagm.onrender.com/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          },
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        setOldUser(responseData.user);
        console.log(responseData.user);
      } catch (err) {
        setIsLoading(false);
        alertCtx.setError(err.message);
      }
    };
    fetchUserById();
  }, [userId]);

  const editUserHandler = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/user/edit/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify(data),
        },
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      alertCtx.setSuccess(responseData.message);
    } catch (err) {
      setIsLoading(false);
      alertCtx.setError(err.message);
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <AddUserForm
          onSubmitUserData={editUserHandler}
          isLoading={isLoading}
          haveError={alertCtx.errorMsg}
          isSuccessful={alertCtx.successMsg}
          oldData={oldUser}
          editMode={true}
        />
      )}
    </Fragment>
  );
};

export default EditUser;
