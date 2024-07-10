import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";

const GrowthTrend = () => {
  const [scale, setScale] = useState("daily");
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [trend, setTrend] = useState("");
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const growthTrend = chartData.labels || [];

  console.log(chartData);

  const getPatientGrowthTrend = async (scale) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/patient/growth-trend?trend=${scale}`,
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

      const { trend, chartData } = responseData;

      setTrend(trend);
      setChartData(chartData);

      setIsLoading(false);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatientGrowthTrend(scale);
  }, [scale]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  return (
    <div className=" w-3/6  p-5 rounded-lg shadow-xl">
      <h1 className="text-2xl font-base mb-4 text-dash-blue">
        Patient Growth Chart
      </h1>
      <div className="mb-4">
        {/* <label htmlFor="scale" className="mr-2">Select Time Scale: </label> */}
        <select
          id="scale"
          onChange={(e) => handleScaleChange(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="border border-gray-300 p-4 rounded">
        {growthTrend.length === 0 ? (
          <p>No data to show</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default GrowthTrend;
