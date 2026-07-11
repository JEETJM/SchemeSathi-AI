import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Bot,
  User,
  Heart,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={19} />,
      path: "/dashboard",
    },
    {
      title: "AI Chat",
      icon: <Bot size={19} />,
      path: "/dashboard/chat",
    },
    {
      title: "Profile",
      icon: <User size={19} />,
      path: "/dashboard/profile",
    },
    {
      title: "Saved Schemes",
      icon: <Heart size={19} />,
      path: "/dashboard/saved",
    },
    {
      title: "Notifications",
      icon: <Bell size={19} />,
      path: "/dashboard/notifications",
    },
    {
      title: "Settings",
      icon: <Settings size={19} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebarLogo">
          🇮🇳
          <span>SchemeSathi AI</span>
        </h2>

        <ul className="sidebarMenu">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={
                  location.pathname === item.path ?
                    "menuLink active"
                  : "menuLink"
                }
              >
                {item.icon}

                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button className="logoutBtn" onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
