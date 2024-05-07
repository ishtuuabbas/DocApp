import React, { Fragment, useContext, useState } from "react";
import { AlertContext } from "../../store/alert-context";
import NewSpinner from "../../UI/NewSpinner";
import { AuthContext } from "../../store/auth-context";
import DoctorForm from "../../components/Doctor/DoctorForm";
import { addDoctor, getAllDoctors } from "../../utils/indexDB/doctorUtils";

const AddDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const addDoctorHandler = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/doctor/create",
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
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      console.log(responseData.doctor);

      addDoctor(responseData.doctor);

      alertCtx.setSuccess(responseData.message);
    } catch (err) {
      alertCtx.setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {isLoading && <NewSpinner />}
      <DoctorForm
        onSubmitDoctorData={addDoctorHandler}
        isLoading={isLoading}
        haveError={alertCtx.errorMsg}
        isSuccessful={alertCtx.successMsg}
      />
    </Fragment>
  );
};

export default AddDoctor;
