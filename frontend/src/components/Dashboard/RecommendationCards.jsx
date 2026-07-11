import "./RecommendationCards.css";
import { useEffect, useState } from "react";
import API from "../../services/api";

function RecommendationCards() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/recommendations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchemes(res.data.recommendations);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recommendationCard">
      <h3>🤖 AI Recommendations</h3>

      {schemes.length === 0 && <p>No recommendations available.</p>}

      {schemes.map((scheme) => (
        <div className="recommendItem" key={scheme._id}>
          <h4>{scheme.name}</h4>

          <p>{scheme.description}</p>

          <div className="recommendFooter">
            <span className="score">⭐ {scheme.score || 90}% Match</span>

            <a href={scheme.officialLink} target="_blank" rel="noreferrer">
              Apply →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecommendationCards;
