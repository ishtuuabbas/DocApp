import React, { Fragment, useContext, useEffect, useState } from "react";
import { AlertContext } from "../../store/alert-context";
import PatientForm from "../../components/Patient/PatientForm";
import NewSpinner from "../../UI/NewSpinner";
import { AuthContext } from "../../store/auth-context";
import { Container } from "@mui/material";
import { getAllDoctors } from "../../utils/indexDB/doctorUtils";
import { addPatient, getAllPatients } from "../../utils/indexDB/patientUtils";

const AddPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctorNames, setDoctorNames] = useState([]);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const addPatientHandler = async (data) => {
    fetch("https://www.google.com", { mode: "no-cors" })
      .then(async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            "https://doctorapp-gagm.onrender.com/api/patient/create",
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
          alertCtx.setError(err.message);
          setIsLoading(false);
        }
      })
      .catch(async () => {
        await addPatient(data);
        const allPatients = await getAllPatients();
        console.log(allPatients);
      });
  };

  const doctorsNameFetcher = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://doctorapp-gagm.onrender.com/api/doctors/name",
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
      setDoctorNames(responseData.doctorNames);
    } catch (err) {
      alertCtx.setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function checkInternetStatus() {
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => {
          doctorsNameFetcher();
        })
        .catch(async () => {
          setIsLoading(true);

          const doctors = await getAllDoctors();
          const newDoctors = doctors.map(({ _id, name }) => ({
            id: _id,
            name,
          }));
          setDoctorNames(newDoctors);
          setIsLoading(false);
        });
    }
    checkInternetStatus();
  }, []);
  return (
    <Fragment>
      {isLoading && <NewSpinner />}

      <Container maxWidth="md">
        <PatientForm
          onSubmitPatientData={addPatientHandler}
          docNames={doctorNames}
        />
      </Container>
    </Fragment>
  );
};

export default AddPatient;
