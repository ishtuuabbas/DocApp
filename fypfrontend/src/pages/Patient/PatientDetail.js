import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { AlertContext } from "../../store/alert-context";
import { useParams } from "react-router-dom";
import NewSpinner from "../../UI/NewSpinner";
import { AuthContext } from "../../store/auth-context";
import Bio from "../../components/Patient/PatientDetailsFolder/Bio";
import { Container } from "@mui/material";

const PatientDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [totalVisits, setTotalVisits] = useState(0);
  const [doctorNames, setDoctorNames] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);

  const alertCtx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);

  const { patientId } = useParams();

  const refundMoneyHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/patient/refund/${patientId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
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
      console.log(err);
      setIsLoading(false);
    }
  };

  const addNewRecordHandler = async (newRecord) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/patient/${patientId}/new/record`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify(newRecord),
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
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const patientRecordsFetcher = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://doctorapp-gagm.onrender.com/api/patient/${patientId}/all-records`,
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
        setPatientRecords(responseData.patientRecords);
        setIsLoading(false);
      } catch (err) {
        alertCtx.setError(err.message);
        setIsLoading(false);
      }
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
        setPatient(responseData.patient);
        setTotalVisits(responseData.totalVisits);
      } catch (err) {
        alertCtx.setError(err.message);
        setIsLoading(false);
      }
    };
    doctorsNameFetcher();
    fetchPatientById();
    patientRecordsFetcher();
  }, [patientId]);

  return (
    <Fragment>
      {isLoading && <NewSpinner />}
      {!isLoading && (
        <Container maxWidth="md">
          <Bio
            patientDetail={patient}
            onSubmitNewRecord={addNewRecordHandler}
            totalVisits={totalVisits}
            docNames={doctorNames}
            patientRecords={patientRecords}
            refundMoneyHandler={refundMoneyHandler}
          />
        </Container>
      )}
    </Fragment>
  );
};

export default PatientDetail;
