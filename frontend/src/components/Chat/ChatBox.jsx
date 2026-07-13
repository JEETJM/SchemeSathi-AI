import { useState } from "react";
import API from "../../services/api";
import ChatMessage from "./ChatMessage";
import Typing from "./Typing";
function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const [schemes, setSchemes] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    // console.log(res.data);
    if (!message.trim()) return;

    setLoading(true);

    try {
      const userMessage = message;

      const res = await API.post("/chat", {
        message: userMessage,
      });

      console.log(res.data);

      setReply(res.data.reply || "");

      setSchemes(res.data.schemes || []);

      setScholarships(res.data.scholarships || []);

      setChatHistory((prev) => [
        ...prev,
        {
          user: userMessage,
          ai: res.data.reply,
        },
      ]);

      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">SchemeSathi AI</h2>

      <textarea
        className="form-control"
        rows="5"
        placeholder="Describe yourself...
Example:
I am 22 years old male from West Bengal studying B.Tech with family income 2 lakh."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="btn btn-primary mt-3"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <hr />

      <h3>🤖 AI Response</h3>

      <div
        className="border rounded p-3 bg-light"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {reply}
      </div>

      <br />

      <h3>📋 Recommended Schemes</h3>

      <div className="row">
        {schemes?.map((scheme, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5>{scheme.name}</h5>

                <p>
                  <strong>Category:</strong> {scheme.category}
                </p>

                <p>
                  <strong>State:</strong> {scheme.state}
                </p>

                <p>
                  <strong>Eligibility:</strong> {scheme.eligibility}
                </p>

                <p>
                  <strong>Eligibility Score:</strong>
                  <span className="badge bg-success ms-2">{scheme.score}%</span>
                </p>

                <strong>Matched Reasons</strong>

                <ul>
                  {scheme.reasons?.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>

                <a
                  href={scheme.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <h3>🎓 Recommended Scholarships</h3>

      <div className="row">
        {scholarships?.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5>{item.name}</h5>

                <p>
                  <strong>Provider:</strong> {item.provider}
                </p>

                <p>
                  <strong>State:</strong> {item.state}
                </p>

                <p>
                  <strong>Benefits:</strong> {item.benefits}
                </p>

                <p>
                  <strong>Eligibility Score:</strong>
                  <span className="badge bg-primary ms-2">{item.score}%</span>
                </p>

                <strong>Matched Reasons</strong>

                <ul>
                  {item.reasons?.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>

                <a
                  href={item.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-warning"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <h3>💬 Chat History</h3>

      {chatHistory.map((chat, index) => (
        <div key={index} className="border rounded p-3 mb-3">
          <p>
            <strong>👤 You:</strong>
            <br />
            {chat.user}
          </p>

          <p>
            <strong>🤖 AI:</strong>
            <br />
            {chat.ai}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
