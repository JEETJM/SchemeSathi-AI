import "./Topbar.css";
import { Bell, Search } from "lucide-react";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div>
        <h2>Welcome 👋</h2>

        <p>{today}</p>
      </div>

      <div className="topbarRight">
        <div className="searchBox">
          <Search size={18} />

          <input type="text" placeholder="Search schemes..." />
        </div>

        <button className="notificationBtn">
          <Bell size={20} />

          <span>3</span>
        </button>

        <div className="profileMini">
          <img
            src={
              user.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.fullName || "User")
            }
            alt=""
          />

          <div>
            <h4>{user.fullName || "User"}</h4>

            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
