import React, { useContext, useEffect, useState } from "react";
import HealingIcon from "@mui/icons-material/Healing";
import ManIcon from "@mui/icons-material/Man";
import Woman2Icon from "@mui/icons-material/Woman2";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";

export const TotalNumBox = ({ val, url }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState([]);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  let searchText = "";

  if (url === "patient") {
    searchText = "allPatients";
  } else if (url === "doctors") {
    searchText = "allDoctors";
  } else {
    searchText = "";
  }

  const getTotalData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/${url}/total`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        },
      );
      const responseData = await response.json();
      console.log(responseData[`${searchText}`]);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setTotalData(responseData[`${searchText}`]);

      setIsLoading(false);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTotalData();
  }, []);

  let icon;
  let title = "";
  let backcolor = "";
  if (val === "patient") {
    icon = <HealingIcon fontSize="large" />;
    title = "Total Patient";
    backcolor = "from-emerald-400 to-cyan-400";
  } else if (val === "male") {
    icon = <ManIcon fontSize="large" />;
    title = "Total Male";
    backcolor = "from-fuchsia-600 to-purple-600";
  } else if (val === "female") {
    icon = <Woman2Icon fontSize="large" />;
    title = "Total Female";
    backcolor = "from-blue-800 to-indigo-900";
  } else {
    throw new Error("Wrong value passed");
  }
  return (
    <div className="w-1/4 p-2">
      <div
        className={`bg-gradient-to-r ${backcolor} p-4 rounded-lg shadow-lg text-white`}
      >
        {icon}
        <p className="text-lg py-1">
          {url === "patient" ? "Total Patients" : "Total Doctors"}
        </p>
        <h2 className="text-lg">{totalData}</h2>
      </div>
    </div>
  );
};
