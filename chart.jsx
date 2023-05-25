import React from 'react'
import { Chart, Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from "react";


function PieChart({chartData, nameLegend, setNameLegend}) {


  // Create if statement to compare if the clicked -
  // that the "label" name = label name of the clicked item.



  // Config spec for PieChart
  const config = {
    plugins: {
      legend: {
        onClick: (e, legendItem) => {
          setNameLegend(legendItem.text);
        }
      },

      //Change pie label(%)
      datalabels: {
        formatter: ((context, args) => {
          // [0, 1, 2, 3] of labels ['Red', 'Blue', 'Yellow', 'Black']
          const index = args.dataIndex;
          // Override label here (In this case I return 'index' to .labels to show the name of label in each slice)
          return args.chart.data.labels[index];
       })
      }
    }
  }

  // console.log(nameLegend);

  // Apply config here
  return (
    <Pie data={chartData} options={config} plugins={[ChartDataLabels]}/>
  )
}

export default PieChart;
