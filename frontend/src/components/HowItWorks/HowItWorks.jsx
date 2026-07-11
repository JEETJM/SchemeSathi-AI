import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    desc: "Enter your age, state, income, occupation and other details.",
  },
  {
    number: "02",
    title: "Ask SchemeSathi AI",
    desc: "Describe yourself in natural language just like ChatGPT.",
  },
  {
    number: "03",
    title: "Get Personalized Results",
    desc: "Receive government schemes and scholarships matching your profile.",
  },
];

function HowItWorks() {
  return (
    <section className="howSection">
      <div className="container">
        <h2>How SchemeSathi AI Works</h2>

        <p className="subTitle">
          Find the right government scheme in just 3 easy steps.
        </p>

        <div className="steps">
          {steps.map((step) => (
            <div className="stepCard" key={step.number}>
              <div className="stepNumber">{step.number}</div>

              <h3>{step.title}</h3>

              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
