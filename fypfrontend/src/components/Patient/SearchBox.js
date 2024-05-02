import { Box, Button, Stack, TextField, useStepContext } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../store/auth-context";
import { AlertContext } from "../../store/alert-context";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/patient/search?q=${searchQuery}`,
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
      setSearchResults(responseData.patient);
      navigate(`/patient/detail/${responseData.patient._id}`);
    } catch (err) {
      alertCtx.setError(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Box marginRight={6}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <TextField
          label="CNIC"
          type="search"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          // disabled={searchQuery.length !== 13}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchBox;
