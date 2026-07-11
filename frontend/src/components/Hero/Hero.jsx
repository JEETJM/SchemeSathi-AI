import "./Hero.css";

function Hero() {
  return (
    <section className="heroSection" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="heroTag">🇮🇳 Powered by Gemma AI</span>

            <h1>
              Discover the Right
              <span> Government Schemes </span>
              in Seconds.
            </h1>

            <p>
              SchemeSathi AI helps every Indian discover government schemes,
              scholarships, financial benefits and welfare programs using
              Artificial Intelligence.
            </p>

            <div className="heroButtons">
              <a href="#chat" className="btn btn-primary btn-lg">
                Try AI
              </a>

              <a
                href="https://github.com/JEETJM/SchemeSathi-AI"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-lg ms-3"
              >
                GitHub
              </a>
            </div>

            <div className="heroStats">
              <div>
                <h3>500+</h3>

                <span>Schemes</span>
              </div>

              <div>
                <h3>1000+</h3>

                <span>Scholarships</span>
              </div>

              <div>
                <h3>28</h3>

                <span>States</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="https://illustrations.popsy.co/amber/artificial-intelligence.svg"
              className="heroImage img-fluid"
              alt="AI"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
