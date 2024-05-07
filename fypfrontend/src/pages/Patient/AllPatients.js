import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useHttpHook } from "../../Hooks/http-hook";
import { AlertContext } from "../../store/alert-context";
import PatientTable from "../../components/Patient/PatientTable";
import NewSpinner from "../../UI/NewSpinner";
import { Box, Container, Typography } from "@mui/material";
import { AuthContext } from "../../store/auth-context";
import {
  addPatient,
  getAllPatients as offlinePatients,
} from "../../utils/indexDB/patientUtils";
// import { useNetwork } from "../../Hooks/useNetwork";

const AllPatients = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpHook();

  const [allPatients, setAllPatients] = useState([]);

  const alertCtx = useContext(AlertContext);

  const authCtx = useContext(AuthContext);
  const getAllPatients = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:8080/api/patients",
        "GET",
        null,
        {
          Authorization: "Bearer " + authCtx.token,
        },
      );
      setAllPatients(responseData.allPatients);
      for (const patient of responseData.allPatients) {
        await addPatient(patient);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    function checkInternetStatus() {
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => {
          getAllPatients();
        })
        .catch(async () => {
          // setIsLoading(true);
          const allPatients = await offlinePatients();
          setAllPatients(allPatients);
          // setIsLoading(false);
        });
    }
    checkInternetStatus();
  }, []);
  const patientDeleteHandler = (patientId) => {
    setAllPatients((prevPatient) =>
      prevPatient.filter((patient) => patient._id !== patientId)
    );
  };

  return (
    <Container maxWidth="lg">
      <Box component="div" sx={{ marginBottom: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ALL PATIENTS
        </Typography>
      </Box>
      {/* <NewSpinner /> */}

      {isLoading && <NewSpinner />}

      <PatientTable
        patients={allPatients}
        haveError={error}
        onPatientDelete={patientDeleteHandler}
      />
    </Container>
  );
};

export default AllPatients;
