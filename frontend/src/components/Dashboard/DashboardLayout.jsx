import "./DashboardLayout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCards from "./StatsCards";
import ProfileCard from "./ProfileCard";
import RecommendationCards from "./RecommendationCards";
import RecentActivity from "./RecentActivity";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboardMain">
        <Topbar />

        <StatsCards />

        <div className="dashboardGrid">
          <ProfileCard />

          <RecommendationCards />
        </div>

        <RecentActivity />
      </main>
    </div>
  );
}

export default DashboardLayout;
