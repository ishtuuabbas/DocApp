// TotalRevenueComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const TotalRevenue = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Create a new chart instance
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Revenue", "Total Refunded Amount"],
        datasets: [
          {
            label: "Amount",
            data: [data.totalRevenue, data.totalRefundedAmount],
            backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup code if needed
      myChart.destroy();
    };
  }, [data]);

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,";
    const headers = ["Label", "Amount"];
    const csvData = [
      "Total Revenue," + data.totalRevenue,
      "Total Refunded Amount," + data.totalRefundedAmount,
    ];

    const csv = [headers.join(","), ...csvData].join("\n");
    const encodedURI = encodeURI(csvContent + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "revenue_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="w-11/12">
      <h1 className="text-2xl font-base mb-4 text-dash-blue">
        Revenue and Refunded Amount Chart
      </h1>
      <div className="text-right">
        <button
          onClick={exportToCSV}
          className="bg-dash-blue hover:bg-dash-blue-light text-white px-4 py-3 rounded-lg my-4"
        >
          Export to CSV
        </button>
      </div>

      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default TotalRevenue;
