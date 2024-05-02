import React, { useContext, useEffect, useState } from "react";
import TotalRevenue from "../../components/RevenueStats/TotalRevenue";
import { AuthContext } from "../../store/auth-context";
import { AlertContext } from "../../store/alert-context";

const Revenue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [revenue, setRevenue] = useState([]);
  const authCtx = useContext(AuthContext);
  const alertCtx = useContext(AlertContext);

  const getRevenue = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/patient/total-revenue`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        },
      );
      const responseData = await response.json();
      console.log(responseData.revenueTotals);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setRevenue(responseData.revenueTotals);

      setIsLoading(false);
    } catch (err) {
      alertCtx.setError(err.message || "Something Went Wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRevenue();
  }, []);

  // const revenueData = [
  //   {
  //     label: "Daily",
  //     totalRevenue: 1000,
  //     totalDiscount: 100,
  //     discountApplied: 50,
  //   },
  //   {
  //     label: "Monthly",
  //     totalRevenue: 30000,
  //     totalDiscount: 3000,
  //     discountApplied: 1000,
  //   },
  //   {
  //     label: "Yearly",
  //     totalRevenue: 150000,
  //     totalDiscount: 15000,
  //     discountApplied: 5000,
  //   },
  // ];

  return (
    <div>
      <div>
        <h1 className="text-4xl mt-8 font-bold text-dash-blue">Revenue</h1>
      </div>
      <div className="w-full h-full flex justify-center p-5 mt-8 rounded-lg shadow-xl">
        <TotalRevenue data={revenue} />
      </div>
    </div>
  );
};

export default Revenue;
