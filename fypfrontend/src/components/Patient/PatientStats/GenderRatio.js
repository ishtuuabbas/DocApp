import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";
import { BASE_URL } from "../../../constant/url";
const GenderRatio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genderRatio, setGenderRatio] = useState([]);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const getPatientGenderRatio = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        BASE_URL+`/api/patient/gender-ratio`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        },
      );
      const responseData = await response.json();
      console.log(responseData.genderRatioData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setGenderRatio(responseData.genderRatioData);

      setIsLoading(false);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatientGenderRatio();
  }, []);

  const genderRatioData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: genderRatio,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(255, 205, 86, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    // Configure Chart.js options here
  };

  return (
    <div className=" w-3/6 flex justify-center p-8 rounded-lg shadow-xl">
      {/* <h2 className="text-2xl font-base mb-2">Gender Ratio</h2> */}
      <Doughnut data={genderRatioData} options={chartOptions} />
    </div>
  );
};

export default GenderRatio;
