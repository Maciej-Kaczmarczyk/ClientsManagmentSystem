import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useClientsStore } from "../stores/useClientsStore";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const clients = useClientsStore((state) => state.clients);

  const joinMonths = [];

  clients.forEach((client) => {
    const date = new Date(client.join_date);
    const month = date.getMonth();
    joinMonths.push(month);
  });

  function sumUniqueNumbers(numbers) {
    const result = Array(12).fill(0); // Initialize an array of zeros with 13 elements (0 to 12)

    for (const number of numbers) {
      if (number >= 0 && number <= 12) {
        result[number]++;
      }
    }

    return result;
  }

  const resultArray = sumUniqueNumbers(joinMonths);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemeber",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "New clients per month",
        data: resultArray,
        fill: true,
        borderColor: "#5A7EFF",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of clients",
          font: {
            family: "Inter",
            size: 18,
            weight: "400",
          },
          padding: { top: 0, left: 0, right: 0, bottom: 20 },
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            family: "Inter",
            size: 18,
            weight: "400",
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };

  return (
    <>
      <div className="flex w-full max-w-screen-xl flex-col rounded-lg border-[1px] bg-uiPrimary pb-1">
        <div className="flex w-full items-center justify-between gap-8 p-8">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
