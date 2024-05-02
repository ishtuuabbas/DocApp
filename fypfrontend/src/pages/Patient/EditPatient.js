import React, { Fragment, useContext, useEffect } from "react";
import AddUserForm from "../../components/User/AddUserForm";
import { useState } from "react";
import { AlertContext } from "../../store/alert-context";
import { useParams } from "react-router-dom";
import NewSpinner from "../../UI/NewSpinner";
import { AuthContext } from "../../store/auth-context";
import PatientForm from "../../components/Patient/PatientForm";
import { Container } from "@mui/material";

const EditPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPatient, setOldPatient] = useState({});
  const [doctorNames, setDoctorNames] = useState([]);

  const alertCtx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);

  const { patientId } = useParams();

  useEffect(() => {
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
    const fetchPatientById = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://doctorapp-gagm.onrender.com/api/patient/${patientId}`,
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
        setOldPatient(responseData.patient);
        console.log(responseData.patient);
      } catch (err) {
        alertCtx.setError(err.message);
        setIsLoading(false);
      }
    };
    fetchPatientById();
    doctorsNameFetcher();
  }, [patientId]);

  const editPatientHandler = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/patient/edit/${patientId}`,
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
      alertCtx.setError(err.message);
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="md">
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <PatientForm
          onSubmitPatientData={editPatientHandler}
          isLoading={isLoading}
          oldData={oldPatient}
          editMode={true}
          docNames={doctorNames}
        />
      )}
    </Container>
  );
};

export default EditPatient;
