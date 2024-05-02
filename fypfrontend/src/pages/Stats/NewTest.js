import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto"; // Add this line
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LocalHospital from "@mui/icons-material/LocalHospital";
import Favorite from "@mui/icons-material/Favorite";
import Alarm from "@mui/icons-material/Alarm";

const NewTest = () => {
  // State for the year dropdown menu
  const [year, setYear] = useState(2022);
  const [anchorEl, setAnchorEl] = useState(null);

  // Data for the bar chart
  const barData = {
    labels: ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"],
    datasets: [
      {
        label: "ICU",
        data: [12, 19, 3, 5, 2, 3, 8, 10],
        backgroundColor: "rgba(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        // borderWidth: 1,
      },
      {
        label: "OPD",
        data: [2, 3, 20, 5, 1, 4, 10, 12],
        backgroundColor: "rgba(54, 162, 235)",
        borderColor: "rgba(54, 162, 235)",
        // borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data for the pie chart
  const pieData = {
    labels: ["Male", "Female", "Child"],
    datasets: [
      {
        label: "Gender",
        data: [300, 200, 100],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Handle the year dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setYear(event.target.value);
    setAnchorEl(null);
  };

  // Render the dashboard
  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 p-2">
        <div className="p-4 rounded-lg shadow-lg text-black">
          <p>Patient In</p>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="w-1/2 p-2 border-2 border-sky-500">
        <div className="p-5 rounded-lg shadow-lg text-black">
          <h3 className="text-xl">Gender</h3>
          {/* <button onClick={handleClick}>{year}</button> */}
          <div className="h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTest;
