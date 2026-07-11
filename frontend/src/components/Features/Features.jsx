import "./Features.css";

const features = [
  {
    icon: "🤖",
    title: "AI Powered",
    text: "Powered by Google Gemma AI to provide intelligent and personalized recommendations.",
  },
  {
    icon: "🎓",
    title: "Scholarships",
    text: "Find Central, State, Private and International scholarships in one place.",
  },
  {
    icon: "🏛️",
    title: "Government Schemes",
    text: "Explore welfare schemes from Central and State Governments across India.",
  },
  {
    icon: "✅",
    title: "Eligibility Checker",
    text: "AI checks your age, income, education and location to find the best schemes.",
  },
  {
    icon: "🌐",
    title: "Multi-Language",
    text: "Supports English, Hindi, Bengali and many other Indian languages.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    text: "Get personalized recommendations within seconds using AI.",
  },
];

function Features() {
  return (
    <section className="featuresSection" id="features">
      <div className="container">
        <div className="sectionHeading">
          <h2>Why Choose SchemeSathi AI?</h2>

          <p>
            One AI Assistant for every Government Scheme, Scholarship and
            Welfare Program.
          </p>
        </div>

        <div className="row">
          {features.map((item, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="featureCard">
                <div className="featureIcon">{item.icon}</div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
