import "../../assets/styles/dashboard.css";

const Dashboard = () => {
  return (
    <aside className="container-dashboard col-xl-2 col-lg-2 col-md-1">
      <div>Circle Graph</div>

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
