import React from 'react'
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js/auto'

function PieChart({chartData}) {
  const handleLabelClick = (event, elements) => {
    // using an if statement to compare if the clicked -
    // that the "label" name = label name of the clicked item.
    if (elements?.length > 0) {
      const label = chartData.labels[elements[0].index]
      console.log(label)
    }
  };

  const config = {
    plugins: {
      legend: {
        onClick: (event) => {
          handleLabelClick();
        }
      }
    }
  };

  return (
    <Pie data={chartData} options={config}/>
  )
}

export default PieChart;
