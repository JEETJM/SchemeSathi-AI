import "./DashboardLayout.css";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCards from "./StatsCards";
import ProfileCard from "./ProfileCard";
import RecommendationCards from "./RecommendationCards";
import RecentActivity from "./RecentActivity";

import { getDashboard, getRecommendations } from "../../services/dashboardApi";

function DashboardLayout() {
  const [dashboardData, setDashboardData] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboard = await getDashboard();

      const recommendation = await getRecommendations();

      setDashboardData(dashboard);

      if (recommendation.recommendations) {
        setRecommendations(recommendation.recommendations);
      } else {
        setRecommendations(recommendation);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboardContent">
        <Topbar />

        <StatsCards stats={dashboardData.stats} />

        <div className="dashboardGrid">
          <RecommendationCards recommendations={recommendations} />

          <ProfileCard user={dashboardData.user} />
        </div>

        <RecentActivity activity={dashboardData.activity} />
      </main>
    </div>
  );
}

export default DashboardLayout;
