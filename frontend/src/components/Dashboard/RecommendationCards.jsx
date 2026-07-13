import "./RecommendationCards.css";

function RecommendationCards({ recommendations = [] }) {
  return (
    <div className="recommendationCard">
      <h3>🤖 AI Recommendations</h3>

      {recommendations.length === 0 ?
        <div className="emptyCard">
          <h4>No Recommendation Found</h4>

          <p>
            Complete your profile to receive AI based government scheme
            recommendations.
          </p>
        </div>
      : recommendations.map((item) => (
          <div key={item._id} className="schemeCard">
            <div>
              <h4>{item.name}</h4>

              <p>{item.description}</p>

              <span className="matchBadge">⭐ {item.score || 0}% Match</span>
            </div>

            <div>
              <a
                href={item.officialLink}
                target="_blank"
                rel="noreferrer"
                className="applyBtn"
              >
                Apply →
              </a>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default RecommendationCards;
