import { useRef, useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { chartData } from "../../../Data/Dashboard/Data";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BarChart({ dateRange }) {
  const chartRef = useRef(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const filteredChartData = useMemo(() => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return {
        labels: chartData.labels,
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(item => item.value)
        }))
      };
    }

    const [startDate, endDate] = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredData = chartData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data
        .filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= start && itemDate <= end;
        })
        .map(item => item.value)
    }));

    const filteredMonths = chartData.labels.filter((_, index) => {
      const monthDate = new Date(chartData.datasets[0].data[index].date);
      return monthDate >= start && monthDate <= end;
    });

    return {
      labels: filteredMonths,
      datasets: filteredData
    };
  }, [dateRange]);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: firstLoad ? 2000 : 0
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#fff',
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          color: '#fff',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-[64%] my-4 flex justify-center items-center">
      <Bar ref={chartRef} data={filteredChartData} options={options} />
    </div>
  );
}