import React, { Fragment, useContext, useEffect, useState } from "react";
import NewSpinner from "../../UI/NewSpinner";
import { Box, Container, Typography } from "@mui/material";
import { AuthContext } from "../../store/auth-context";
import ContactTable from "./ContactTable";


const AllContact = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allContact, setAllContact] = useState([]);
  const authCtx = useContext(AuthContext);

  const getAllContact = async () => {
    try {
     
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/contacts",
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
      setAllContact(responseData);
    

      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong!");

      setIsLoading(false);
    }
  };


  useEffect(() => {
    getAllContact();

  }, []);
  return (
    <Container maxWidth="lg">
      <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ALL Contacts
        </Typography>
      </Box>
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <ContactTable
          contacts={allContact}
          haveError={error}
      
        />
      )}
    </Container>
  );
};

export default AllContact;
