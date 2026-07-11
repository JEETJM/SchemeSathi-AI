import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg customNavbar">

      <div className="container">

        <a className="navbar-brand logo" href="/">
          SchemeSathi AI
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a href="#features" className="nav-link">
                Features
              </a>
            </li>

            <li className="nav-item">
              <a href="#how" className="nav-link">
                How It Works
              </a>
            </li>

            <li className="nav-item">
              <a href="#chat" className="nav-link">
                AI Chat
              </a>
            </li>

            <li className="nav-item">
              <a
                href="https://github.com/JEETJM/SchemeSathi-AI"
                target="_blank"
                rel="noreferrer"
                className="btn githubBtn"
              >
                GitHub
              </a>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;