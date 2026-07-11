import "./Topbar.css";

function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="topbar">
      <div>
        <h2>Welcome 👋</h2>
        <p>{today}</p>
      </div>

      <div className="topbarRight">
        <input type="text" placeholder="Search schemes..." />

        <img
          src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default Topbar;
