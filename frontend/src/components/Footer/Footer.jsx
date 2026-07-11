import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div>
          <h2>SchemeSathi AI 🇮🇳</h2>

          <p>AI Powered Government Scheme Recommendation Platform</p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="/login">Login</a>

          <a href="/register">Register</a>
        </div>

        <div>
          <h3>Resources</h3>

          <a href="/">Government Schemes</a>

          <a href="/">Scholarships</a>

          <a href="/">Contact</a>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © 2026 SchemeSathi AI | Built for Smart India Hackathon 🇮🇳
      </p>
    </footer>
  );
}

export default Footer;
