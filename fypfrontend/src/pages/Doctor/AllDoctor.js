import React, { Fragment, useContext, useEffect, useState } from "react";
import NewSpinner from "../../UI/NewSpinner";
import { Box, Container, Typography } from "@mui/material";
import { AuthContext } from "../../store/auth-context";
import DoctorTable from "../../components/Doctor/DoctorTable";
import {
  addArrayOfDoctors,
  clearAllDoctors,
  getAllDoctors,
  addDoctor,
} from "../../utils/indexDB/doctorUtils";
import useInternetConnectivity from "../../Hooks/useInternetConnectivity";
const AllDoctor = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allDoctor, setAllDoctor] = useState([]);
  const authCtx = useContext(AuthContext);

  const getAllDoctor = async () => {
    try {
      if (!navigator.onLine) {
        const doct = await getAllDoctors();

        console.log(doct);
        setAllDoctor(doct);
        return;
      }

      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/doctors",
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
      setAllDoctor(responseData.allDoctors);
      const allOfflineDoctors = await getAllDoctors();

      if (allOfflineDoctors.length === 0) {
        for (const dd of responseData.allDoctors) {
          await addDoctor(dd);
        }
      }

      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong!");

      setIsLoading(false);
    }
  };

  const doctorDeleteHandler = async (doctorId) => {
    setAllDoctor((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor._id !== doctorId),
    );

    const allOfflineDoctors = await getAllDoctors();
    await clearAllDoctors();
    const newArray = allOfflineDoctors.filter((obj) => obj._id !== doctorId);

    await addArrayOfDoctors(newArray);
  };

  useEffect(() => {
    function checkInternetStatus() {
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => {
          getAllDoctor();
        })
        .catch(async () => {
          setIsLoading(true);
          const doct = await getAllDoctors();

          console.log(doct);
          setAllDoctor(doct);
          setIsLoading(false);
        });
    }
    checkInternetStatus();
  }, []);
  return (
    <Container maxWidth="lg">
      <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ALL Doctor
        </Typography>
      </Box>
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <DoctorTable
          doctors={allDoctor}
          haveError={error}
          onDoctorDelete={doctorDeleteHandler}
        />
      )}
    </Container>
  );
};

export default AllDoctor;
