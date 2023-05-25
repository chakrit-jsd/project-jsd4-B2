import React from 'react'
import { useRef } from 'react';
import { Chart, Pie, getElementsAtEvent } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';


function PieChart({chartData, nameLegend, setNameLegend}) {


  // Create if statement to compare if the clicked -
  // that the "label" name = label name of the clicked item.

  // Config spec for PieChart
  const config = {
    plugins: {
      onClick: (e, legendItem) => {
        setNameLegend(legendItem.text)
      },
      legend: {
        onClick: (e, legendItem) => {
          setNameLegend(legendItem.text);
        },
        position: 'bottom',
        align: 'center',
        labels:{
          boxWidth: 12,
          padding: 5,
        },
      },

      //Remove pie label(%)
      datalabels: {
        labels: {
          title: null
        },
      },
    }
  }

  const chartRef = useRef();
  const onClick = (event) => {
    const checkEvent = getElementsAtEvent(chartRef.current, event)
    if (checkEvent.length > 0) {
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index
      if (dataPoint == 0) {
        return setNameLegend('Yoga')
      }
      else if (dataPoint == 1) {
        return setNameLegend('Hiit')
      }
      else if (dataPoint == 2) {
        return setNameLegend('Pilates')
      }
      else if (dataPoint == 3) {
        return setNameLegend('Strength')
      }
      else if (dataPoint == 4) {
        return setNameLegend('Weight')
      }
    } else {
      console.log('Please select on a chart')
    }
  };


  // Apply config here
  return (
    <Pie
      data={chartData}
      options={config}
      plugins={[ChartDataLabels]}
      onClick={onClick}
      ref={chartRef}
    />
  )
}

export default PieChart;
