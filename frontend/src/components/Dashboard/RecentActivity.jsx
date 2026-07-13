import "./RecentActivity.css";

function RecentActivity({ activity = [] }) {
  return (
    <div className="recentActivity">
      <h3>Recent Activity</h3>

      {activity.length === 0 ?
        <div className="emptyActivity">No recent activity.</div>
      : activity.map((item, index) => (
          <div key={index} className="activityItem">
            <h4>{item.title}</h4>

            <p>{item.description}</p>

            <small>{item.date}</small>
          </div>
        ))
      }
    </div>
  );
}

export default RecentActivity;
