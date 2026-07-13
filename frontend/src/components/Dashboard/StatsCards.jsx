import "./StatsCards.css";

function StatsCards({ stats }) {
  return (
    <div className="statsGrid">
      <div className="statsCard">
        <h2>{stats?.totalSchemes || 0}</h2>
        <p>Eligible Schemes</p>
      </div>

      <div className="statsCard">
        <h2>{stats?.totalScholarships || 0}</h2>
        <p>Scholarships</p>
      </div>

      <div className="statsCard">
        <h2>{stats?.saved || 0}</h2>
        <p>Saved</p>
      </div>

      <div className="statsCard">
        <h2>{stats?.profileScore || 0}%</h2>
        <p>Profile Score</p>
      </div>
    </div>
  );
}

export default StatsCards;
