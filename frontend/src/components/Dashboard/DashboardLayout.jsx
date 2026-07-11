import "./DashboardLayout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCards from "./StatsCards";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboardMain">
        <Topbar />

        <div className="dashboardContent">
          <StatsCards />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
