// src/components/PatientStatistics.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const data = {
  labels: ["New", "Recovered", "Treatment 1", "Treatment 2"],
  datasets: [
    {
      data: [94, 56, 67, 60],
      backgroundColor: ["#FFD700", "#4CAF50", "#FF5722", "#2196F3"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const TestDognut = () => {
  return (
    <div className="container mx-auto mt-8 p-8">
      <h1 className="text-2xl font-bold mb-4">PATIENTS</h1>
      <div className="flex mb-8">
        <button className="mr-4 bg-blue-500 text-white py-2 px-4 rounded">
          Daily
        </button>
        <button className="mr-4 bg-gray-300 text-gray-700 py-2 px-4 rounded">
          Weekly
        </button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded">
          Monthly
        </button>
      </div>
      <div className="flex justify-center items-center mb-8">
        <Doughnut
          data={data}
          options={options}
          style={{ width: "400px", height: "400px" }}
        />
        <div className="absolute flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">962,634</p>
          <p className="text-gray-600">Total People</p>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="bg-yellow-200 p-4 text-center rounded">
          <StarIcon fontSize="large" />
          <p className="text-lg font-bold">New</p>
          <p className="text-xl font-bold">94%</p>
        </div>
        <div className="bg-green-200 p-4 text-center rounded">
          <CheckIcon fontSize="large" />
          <p className="text-lg font-bold">Recovered</p>
          <p className="text-xl font-bold">56%</p>
        </div>
        <div className="bg-red-200 p-4 text-center rounded">
          <LocalHospitalIcon fontSize="large" />
          <p className="text-lg font-bold">Treatment 1</p>
          <p className="text-xl font-bold">67%</p>
        </div>
        <div className="bg-blue-200 p-4 text-center rounded">
          <LocalHospitalIcon fontSize="large" />
          <p className="text-lg font-bold">Treatment 2</p>
          <p className="text-xl font-bold">60%</p>
        </div>
      </div>
    </div>
  );
};

export default TestDognut;
