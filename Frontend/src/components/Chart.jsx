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

// Register ChartJS plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = () => {
  // Get clients data from the store
  const { clients } = useClientsStore();

  // Get the month of each client's join date and store it in an array like [1, 1, 1, 2, 2, 2, 3, 3, 3 ...] where 0 is January, 1 is February, 2 is March and so on
  const joinMonths = clients.map((client) =>
    new Date(client.join_date).getMonth(),
  );

  // Sum the number of clients per month and store it in an array where the index is the month and the value is the number of clients in that month like [0, 3, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0] where 0 is January, 1 is February, 2 is March and so on
  const sumUniqueNumbers = (numbers) => {
    const result = Array.from({ length: 12 }, () => 0);

    for (const number of numbers) {
      if (number >= 0 && number <= 12) {
        result[number]++;
      }
    }

    return result;
  };

  // Get the sum of clients per month and store it in an array
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
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "New clients per month",
        data: [12, 21,24, 32, 18, 5, 12, 21, 24, 32, 18, 5],
        borderColor: "#5A7EFF",
        tension: 0.03,
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
          font: function (context) {
            var avgSize = Math.round((context.chart.height + context.chart.width) / 2);
            var size = Math.round(avgSize / 32);
            size = size > 20 ? 20 : size;
            return {
                size: size,
                weight: 'bold'
            };
        },
          padding: { top: 0, left: 0, right: 0, bottom: 20 },
        },
        ticks: {
          precision: 0,
        },
        beginAtZero: 1,
      },
      x: {
        title: {
          display: true,
          text: "Month",
          font: function (context) {
            var avgSize = Math.round((context.chart.height + context.chart.width) / 2);
            var size = Math.round(avgSize / 32);
            size = size > 20 ? 20 : size;
            return {
                size: size,
                weight: 'bold'
            };
        },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
