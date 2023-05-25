import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";
import PieChart from "./component/chart";
import { getDashboard } from "../../services/API/usersAPI";
// import { ' activityData ' } from Database here


const Dashboard = ({ user, mobileShow }) => {
  const [chartData, setChartData] = useState('');
  const [nameLegend, setNameLegend] = useState(user.interest || 'Yoga');
  const [pieData, setPieData] = useState({});
  useEffect(() => {
    const getChart = async () => {
      let userId = user._id
      if (!user.thisme) {
        userId = 'me';
      }
      // console.log(userId)
      try {
        const chartRes = await getDashboard(userId);
        // console.log(chartRes)
        setChartData(chartRes.data.dashboard);
      } catch (error) {
        console.log(error)
      }
    }
    getChart()
  }, [user])

  useEffect(() => {
    const labels = []
    const dataPercentage = []
    for (const type in chartData) {
      if (type !== 'totalTimeSpent') {
        // console.log('asdf')
        labels.push(type)
        dataPercentage.push(chartData[type].percentage)
      }
    }
    setPieData({
      labels: labels,
      dataPercentage: dataPercentage
    })
  }, [chartData])
  // Add data and customize chart here
  // console.log(dataPercentage)
  // console.log(labels)
  const data = {
    labels: pieData.labels,
    datasets: [
      {
        label: ' ',
        data: pieData.dataPercentage,
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
    <aside className={`container-dashboard col-xxl-2 col-xl-3 col-lg-2 col-md-1  ${mobileShow !== 'dashboard' ? 'mobile-diplay-none' : null}`}>
      <header className="title-outter-box">
        <font className="title-text">
          Activity Summary
        </font>
      </header>

      <div className="pieChart">
        <PieChart data={data} chartData={chartData} nameLegend={nameLegend} setNameLegend={setNameLegend}/>
      </div>

      <main className="activity-detail-box">
        <div className="activity-detail" id="act-1-detail">
          <p className="detail-outter-box" id="act-name">
            <b>Type: &nbsp;
            {nameLegend}</b>
          </p>
          <p className="detail-outter-box">
            &nbsp;&nbsp;Total time: &nbsp;
            {chartData[nameLegend]?.percentage}%
          </p>
          <p className="detail-outter-box">
            &nbsp;&nbsp;Submitted activity: &nbsp;
            {chartData[nameLegend]?.count}
          </p>
          <p className="detail-outter-box">
            <span>
              &nbsp;&nbsp;Time spent (HR.): &nbsp;
              {chartData[nameLegend]?.timeSpent.hours}
            </span>
            :
            <span>
            {chartData[nameLegend]?.timeSpent.minutes}
            </span>
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
