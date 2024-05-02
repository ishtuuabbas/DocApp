import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";

const Demographic = () => {
  // Sample data (replace with actual data)
  const ageDistributionData = {
    labels: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61+"],
    datasets: [
      {
        label: "Age Distribution",
        data: [15, 25, 30, 20, 18, 15, 10],
        backgroundColor: "rgba(33, 150, 243, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const genderRatioData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [60, 40, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(255, 205, 86, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const areaDistributionData = {
    labels: ["Area A", "Area B", "Area C", "Area D"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          "rgba(33, 150, 243, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    // Configure Chart.js options here
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8 flex flex-wrap gap-8">
      <div className="flex-1 h-full">
        <h2 className="text-xl font-base mb-2">Age Distribution</h2>
        <Bar data={ageDistributionData} options={chartOptions} />
      </div>

      <div className="flex-1 h-full">
        <h2 className="text-xl font-base mb-2">Gender Ratio</h2>
        <Doughnut data={genderRatioData} options={chartOptions} />
      </div>

      <div className="flex-1 h-full">
        <h2 className="text-xl font-base mb-2">Area-wise Distribution</h2>
        <Pie data={areaDistributionData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Demographic;
