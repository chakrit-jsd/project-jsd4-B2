import { useState } from "react";
import "../../assets/styles/dashboard.css";
import PieChart from "../../../chart";
// import { ' activityData ' } from Database here

const dashboard = {
  Yoga: {
    percentage: 20,
    count: 123,
    totalTime: 2342
  },
  Hiit: {
    percentage: 30,
    count: 123,
    totalTime: 2342
  },
  Pilates: {
    percentage: 10,
    count: 123,
    totalTime: 2342
  },
  Strength: {
    percentage: 15,
    count: 123,
    totalTime: 2342
  },
  Weight: {
    percentage: 25,
    count: 123,
    totalTime: 2342
  },
}

const Dashboard = () => {
  const [nameLegend, setNameLegend] = useState('');

  // Add data and customize chart here
  const data = {
    labels: ['Yoga', 'Hiit', 'Pilates', 'Strength', 'Weight'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          dashboard.Yoga.percentage,
          dashboard.Hiit.percentage,
          dashboard.Pilates.percentage,
          dashboard.Strength.percentage,
          dashboard.Weight.percentage
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(0, 0, 0)',
          'rgb(10, 10, 120)',
          'rgb(10, 150, 120)'
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <aside className="container-dashboard col-xl-2 col-lg-2 col-md-1">
      <div className="pieChart" style = {{width: 230.83}}>
        <PieChart chartData={data} nameLegend={nameLegend} setNameLegend={setNameLegend}/>
      </div>

      <main className="activity-detail-box">
        <div className="activity-detail" id="act-1-detail">
          <p className="act-name">
            {nameLegend}
          </p>
          <p className="act-percent">
            Percent:
            {dashboard[nameLegend]?.percentage}
          </p>
          <p>
          Count:
          {dashboard[nameLegend]?.count}
          </p>
          <p>
          Total Time:
          {dashboard[nameLegend]?.totalTime}
          </p>
        </div>

      </main>

      <footer className="achievement">
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
      </footer>
    </aside>
  );
};

export default Dashboard;
