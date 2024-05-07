import React, { Fragment, useContext, useEffect, useState } from "react";
import BasicTable from "../../components/User/BasicTable";
import NewSpinner from "../../UI/NewSpinner";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../store/auth-context";

const AllUsers = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const authCtx = useContext(AuthContext);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/users",
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
      setAllUsers(responseData.allUsers);
      console.log(responseData.allUsers);
    } catch (err) {
      setError(err.message || "Something went wrong!");

      setIsLoading(false);
    }
  };

  const userDeleteHandler = (userId) => {
    setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Fragment>
      <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ALL USERS
        </Typography>
      </Box>
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <BasicTable
          users={allUsers}
          haveError={error}
          onUserDelete={userDeleteHandler}
        />
      )}
    </Fragment>
  );
};

export default AllUsers;
