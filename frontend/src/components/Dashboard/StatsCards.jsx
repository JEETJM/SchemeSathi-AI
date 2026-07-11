import "./StatsCards.css";
import { useEffect, useState } from "react";
import API from "../../services/api";

function StatsCards() {
  const [stats, setStats] = useState({
    totalSchemes: 0,
    totalScholarships: 0,
    saved: 0,
    chats: 0,
    profileScore: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data.stats);
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Eligible Schemes",
      value: stats.totalSchemes,
      color: "#2563eb",
    },
    {
      title: "Scholarships",
      value: stats.totalScholarships,
      color: "#16a34a",
    },
    {
      title: "Saved",
      value: stats.saved,
      color: "#dc2626",
    },
    {
      title: "Profile Score",
      value: `${stats.profileScore}%`,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="statsGrid">
      {cards.map((card, index) => (
        <div
          key={index}
          className="statsCard"
          style={{ borderTop: `5px solid ${card.color}` }}
        >
          <h2>{card.value}</h2>

          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
