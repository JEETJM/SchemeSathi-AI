import "./Topbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, House, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <h2>Welcome 👋</h2>

        <p>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="topbarRight">
        <div className="searchBox">
          <Search size={18} />

          <input placeholder="Search schemes..." />
        </div>

        <button className="bellBtn">
          <Bell size={21} />
        </button>

        <div className="profileMenu" onClick={() => setOpen(!open)}>
          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                user?.fullName || "User",
              )}`
            }
            alt=""
          />

          <span>{user?.fullName || "User"}</span>

          <ChevronDown size={18} />

          {open && (
            <div className="dropdown">
              <button onClick={() => navigate("/profile")}>
                <User size={18} />
                Profile
              </button>

              <button onClick={() => navigate("/")}>
                <House size={18} />
                Home
              </button>

              <button onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
