import "./StatsCards.css";

function StatsCards() {
  return (
    <>
      <div className="statsGrid">
        <div className="statsCard">
          <h2>3</h2>
          <p>Eligible Schemes</p>
        </div>

        <div className="statsCard">
          <h2>5</h2>
          <p>Scholarships</p>
        </div>

        <div className="statsCard">
          <h2>0</h2>
          <p>Saved</p>
        </div>

        <div className="statsCard">
          <h2>0%</h2>
          <p>Profile Score</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "35px",
          background: "#fff",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        }}
      >
        <h3>🤖 AI Recommendations</h3>

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              border: "1px solid #eee",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          >
            <h5>Swami Vivekananda Merit-cum-Means Scholarship</h5>

            <p>Scholarship for eligible students in West Bengal.</p>

            <span
              style={{
                background: "#22c55e",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              ⭐ 90% Match
            </span>
          </div>

          <div
            style={{
              border: "1px solid #eee",
              padding: "18px",
              borderRadius: "12px",
            }}
          >
            <h5>PM Kisan</h5>

            <p>Income support scheme for farmers.</p>

            <span
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              ⭐ 88% Match
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsCards;
