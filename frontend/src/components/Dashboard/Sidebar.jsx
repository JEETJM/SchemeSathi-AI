import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { House } from "lucide-react";
import {
  House,
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

    navigate("/");
  };

  const menu = [
    {
      title: "Home",
      path: "/",
      icon: <House size={18} />,
    },

    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      title: "AI Chat",
      path: "/chat",
      icon: <Bot size={18} />,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: <User size={18} />,
    },

    {
      title: "Saved Schemes",
      path: "/saved",
      icon: <Heart size={18} />,
    },

    {
      title: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
    },

    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
  ];
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebarLogo">
          🇮🇳
          <span>SchemeSathi AI</span>
        </div>

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
