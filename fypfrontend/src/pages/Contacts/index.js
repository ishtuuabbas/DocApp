import React, { Fragment, useContext, useEffect, useState } from "react";
import NewSpinner from "../../UI/NewSpinner";
import { Box, Container, Typography } from "@mui/material";
import { AuthContext } from "../../store/auth-context";
import ContactTable from "./ContactTable";
import { BASE_URL } from "../../constant/url";

const AllContact = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allContact, setAllContact] = useState([]);
  const authCtx = useContext(AuthContext);

  const getAllContact = async () => {
    try {
     
      setIsLoading(true);
      const response = await fetch(
        BASE_URL+"/api/contacts",
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

  const onContactDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        BASE_URL+`/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
  
      // Remove the deleted contact from the state
      setAllContact((prevContacts) => prevContacts.filter(contact => contact._id !== id));
  
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
          onContactDelete={onContactDelete}
      
        />
      )}
    </Container>
  );
};

export default AllContact;
