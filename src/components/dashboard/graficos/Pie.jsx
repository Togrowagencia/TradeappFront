import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = ({ dynamicData }) => {
  const [dataKey, setDataKey] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["Call", "Put"],
    datasets: [{
      data: dynamicData || [300, 200],
      backgroundColor: [
        "#00E676",  // Color para Call
        "#E53935"   // Color para Put
      ],
      borderWidth: 0,
      cutout: "0%",
      hoverOffset: 4,
    }]
  });

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: dynamicData || prev.datasets[0].data,
          borderWidth: 0, 
        },
      ],
    }));
    setDataKey((prev) => prev + 1);
  }, [dynamicData]);

  const variableRadiusPlugin = {
    id: "variableRadius",
    beforeDraw(chart) {
      const { chartArea } = chart;
      if (!chartArea) return;

      const meta = chart.getDatasetMeta(0);
      const radius = Math.min(chartArea.width / 2, chartArea.height / 2);
      const currentData = chart.data.datasets[0].data;
      const maxValue = Math.max(...currentData);

      meta.data.forEach((arc, index) => {
        const value = currentData[index];
        const minRadius = 0.7;
        arc.outerRadius = radius * Math.max(value / maxValue, minRadius);
      });
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 2500, 
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[6pc] h-[6pc] lp:w-[4.8pc] lp:h-[4.8pc]">
        <Doughnut
          key={dataKey}
          data={chartData}
          options={options}
          plugins={[variableRadiusPlugin]}
        />
      </div>
    </div>
  );
};
Pie.propTypes = {
  dynamicData: PropTypes.arrayOf(PropTypes.number),
};

export default Pie;
