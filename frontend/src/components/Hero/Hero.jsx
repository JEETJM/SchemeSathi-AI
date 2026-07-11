import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <span className="hero-badge">
          🇮🇳 India's Smart Government AI
        </span>

        <h1>
          Discover Government
          <span> Schemes & Scholarships </span>
          Instantly
        </h1>

        <p>
          SchemeSathi AI helps citizens find eligible Government
          Schemes, Scholarships, Financial Assistance,
          Jobs and Welfare Programs using Artificial Intelligence.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            🚀 Ask AI
          </button>

          <button className="secondary-btn">
            📚 Explore Schemes
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <h2>10K+</h2>
            <span>Gov Schemes</span>
          </div>

          <div>
            <h2>25K+</h2>
            <span>Scholarships</span>
          </div>

          <div>
            <h2>AI</h2>
            <span>Eligibility Check</span>
          </div>

          <div>
            <h2>28+</h2>
            <span>States</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;