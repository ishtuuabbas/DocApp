import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";

// const getChartData = (scale) => {
//   switch (scale) {
//     case "daily":
//       return {
//         labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//         datasets: [
//           {
//             label: "Patient Growth (Daily)",
//             data: [5, 10, 8, 15, 12],
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 2,
//           },
//         ],
//       };
//     case "monthly":
//       return {
//         labels: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//         datasets: [
//           {
//             label: "Patient Growth (Monthly)",
//             data: [50, 60, 80, 90, 70, 100, 120, 130, 110, 90, 80, 95],
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 2,
//           },
//         ],
//       };
//     case "yearly":
//       return {
//         labels: ["2021", "2022", "2023", "2024"],
//         datasets: [
//           {
//             label: "Patient Growth (Yearly)",
//             data: [200, 250, 300, 350],
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 2,
//           },
//         ],
//       };
//     default:
//       return {};
//   }
// };

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
        `https://doctorapp-gagm.onrender.com/api/patient/growth-trend?trend=${scale}`,
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
