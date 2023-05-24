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
  const [nameLegend, setNameLegend] = useState('Yoga');

  // Add data and customize chart here
  const data = {
    labels: ['Yoga', 'Hiit', 'Pilates', 'Strength', 'Weight'],
    datasets: [
      {
        label: 'Percentage',
        data: [
          dashboard.Yoga.percentage,
          dashboard.Hiit.percentage,
          dashboard.Pilates.percentage,
          dashboard.Strength.percentage,
          dashboard.Weight.percentage
        ],
        backgroundColor: [
          '#C6D57E',
          '#FF7878',
          '#F1935C',
          '#BAE5E5',
          '#FFEB99'
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <aside className="container-dashboard col-xl-2 col-lg-2 col-md-1">
      <div className="pieChart">
        <PieChart chartData={data} nameLegend={nameLegend} setNameLegend={setNameLegend}/>
      </div>

      <main className="activity-detail-box">
        <div className="activity-detail" id="act-1-detail">
          <p className="detail-outter-box" id="act-name">
            <b>Type: &nbsp;
            {nameLegend}</b>
          </p>
          <p className="detail-outter-box">
            &nbsp;&nbsp;Total time: &nbsp;
            {dashboard[nameLegend]?.percentage}%
          </p>
          <p className="detail-outter-box">
            &nbsp;&nbsp;Submitted activity: &nbsp;
            {dashboard[nameLegend]?.count}
          </p>
          <p className="detail-outter-box">
           &nbsp;&nbsp;Time spent (min.): &nbsp;
           {dashboard[nameLegend]?.totalTime}
          </p>
        </div>

      </main>

      {/* <footer className="achievement">
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
        <span className="bagde-1">B</span>
      </footer> */}
    </aside>
  );
};

export default Dashboard;
