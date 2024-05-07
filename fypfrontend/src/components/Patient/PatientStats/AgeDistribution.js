import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";

const AgeDistribution = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ageDistribution, setAgeDistribution] = useState([]);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const getPatientAgeDistribution = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/patient/age-distribution`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        },
      );
      const responseData = await response.json();
      console.log(responseData.ageDistributionData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setAgeDistribution(responseData.ageDistributionData);

      setIsLoading(false);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatientAgeDistribution();
  }, []);

  const ageDistributionData = {
    labels: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61+"],
    datasets: [
      {
        label: "Age Distribution",
        data: ageDistribution,
        backgroundColor: "rgba(33, 150, 243, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    // Configure Chart.js options here
  };

  return (
    <div className=" w-3/6  p-5 rounded-lg shadow-xl">
      <h2 className="text-2xl font-base mb-2 text-dash-blue">
        Age Distribution
      </h2>
      <Bar data={ageDistributionData} options={chartOptions} />
    </div>
  );
};

export default AgeDistribution;
