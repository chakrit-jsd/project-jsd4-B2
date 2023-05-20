import { useState } from "react";
import "../../assets/styles/dashboard.css";
import PieChart from "../../../chart";
// import { ' activityData' }

const Dashboard = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Black'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(0, 0, 0)',
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <aside className="container-dashboard col-xl-2 col-lg-2 col-md-1">
      <div style = {{width: 200}}>
        <PieChart chartData={data}/>
      </div>

      <main className="activity-detail-box">
        <div className="activity-detail" id="act-1-detail">
          <span className="act-name">
            Yoga
          </span>
          <span className="act-time">
            10min
          </span>
        </div>
        <div className="activity-detail" id="act-2-detail">
          <span className="act-name">
            HIIT
          </span>
          <span className="act-time">
            10min
          </span>
        </div>
        <div className="activity-detail" id="act-3-detail">
          <span className="act-name">
            Weight Training
          </span>
          <span className="act-time">
            10min
          </span>
        </div>
        <div className="activity-detail" id="act-4-detail">
          <span className="act-name">
            Strength Training
          </span>
          <span className="act-time">
            10min
          </span>
        </div>
        <div className="activity-detail" id="act-5-detail">
          <span className="act-name">
            Pilates
          </span>
          <span className="act-time">
            10min
          </span>
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
