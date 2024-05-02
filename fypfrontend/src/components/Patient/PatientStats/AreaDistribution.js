import React from "react";
import { Pie } from "react-chartjs-2";

const AreaDistribution = () => {
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
    <div className=" w-3/6 flex justify-center  p-8 rounded-lg shadow-xl">
      {/* <h2 className="text-2xl font-base mb-2">Area-wise Distribution</h2> */}
      <Pie data={areaDistributionData} options={chartOptions} />
    </div>
  );
};

export default AreaDistribution;
