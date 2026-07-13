import { useState, useEffect } from "react";
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

  // ==========================
  // Session
  // ==========================

  const [sessionId, setSessionId] = useState(
    localStorage.getItem("schemeSession") || "",
  );

  // ==========================
  // Load Chat History
  // ==========================

  useEffect(() => {
    const history = localStorage.getItem("schemeChatHistory");

    if (history) {
      setChatHistory(JSON.parse(history));
    }
  }, []);

  // ==========================
  // Save Chat History
  // ==========================

  useEffect(() => {
    localStorage.setItem("schemeChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // ==========================
  // New Chat
  // ==========================

  const clearChat = () => {
    localStorage.removeItem("schemeSession");
    localStorage.removeItem("schemeChatHistory");

    setSessionId("");
    setChatHistory([]);

    setReply("");
    setSchemes([]);
    setScholarships([]);
  };

  // ==========================
  // Send Message
  // ==========================

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const userMessage = message;

    // Show immediately

    setChatHistory((prev) => [
      ...prev,
      {
        user: userMessage,
        ai: "Thinking...",
      },
    ]);

    try {
      const res = await API.post("/chat", {
        message: userMessage,
        sessionId,
      });

      console.log(res.data);

      // Save session id

      if (res.data.sessionId) {
        setSessionId(res.data.sessionId);
        localStorage.setItem("schemeSession", res.data.sessionId);
      }

      setReply(res.data.reply || "");

      setSchemes(res.data.schemes || []);

      setScholarships(res.data.scholarships || []);

      setChatHistory((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          user: userMessage,
          ai: res.data.reply,
        };

        return updated;
      });

      setMessage("");
    } catch (err) {
      console.error(err);

      setChatHistory((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          user: userMessage,
          ai: "❌ AI service unavailable. Please try again.",
        };

        return updated;
      });
    }

    setLoading(false);
  };
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🤖 SchemeSathi AI</h2>

        <button className="btn btn-danger" onClick={clearChat}>
          🗑 New Chat
        </button>
      </div>

      {/* ========================= */}
      {/* Input */}
      {/* ========================= */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <textarea
            className="form-control"
            rows="5"
            placeholder="Example:
I am 21 years old male from West Bengal studying B.Tech Engineering. My family income is 2 lakh. Category OBC."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="btn btn-primary mt-3"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask SchemeSathi"}
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* Chat */}
      {/* ========================= */}

      <div className="card shadow">
        <div
          className="card-body"
          style={{
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          {chatHistory.length === 0 && (
            <div className="text-center text-muted">
              <h5>Welcome 👋</h5>

              <p>Ask anything about Government Schemes & Scholarships.</p>
            </div>
          )}

          {chatHistory.map((chat, index) => (
            <div key={index}>
              {/* USER */}

              <div className="text-end mb-3">
                <div
                  className="d-inline-block bg-primary text-white rounded p-3"
                  style={{
                    maxWidth: "75%",
                  }}
                >
                  {chat.user}
                </div>
              </div>

              {/* AI */}

              <div className="text-start mb-4">
                <div
                  className="d-inline-block bg-light border rounded p-3"
                  style={{
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {chat.ai}
                </div>
              </div>
            </div>
          ))}

          {loading && <Typing />}
        </div>
      </div>

      {/* ========================= */}
      {/* Schemes */}
      {/* ========================= */}

      {schemes.length > 0 && (
        <>
          <h3 className="mt-5 mb-3">📋 Recommended Schemes</h3>

          <div className="row">
            {schemes.map((scheme, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5>{scheme.name}</h5>

                    <p>
                      <strong>State :</strong> {scheme.state}
                    </p>

                    <p>
                      <strong>Eligibility :</strong> {scheme.eligibility}
                    </p>

                    <span className="badge bg-success mb-3">
                      {scheme.score}% Match
                    </span>

                    <br />

                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success"
                    >
                      Official Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ========================= */}
      {/* Scholarships */}
      {/* ========================= */}

      {scholarships.length > 0 && (
        <>
          <h3 className="mt-5 mb-3">🎓 Recommended Scholarships</h3>

          <div className="row">
            {scholarships.map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5>{item.name}</h5>

                    <p>
                      <strong>Provider :</strong> {item.provider}
                    </p>

                    <p>
                      <strong>Benefits :</strong> {item.benefits}
                    </p>

                    <span className="badge bg-primary mb-3">
                      {item.score}% Match
                    </span>

                    <br />

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
        </>
      )}
    </div>
  );

}
// }
//       )}
//     </div>
//   );
// }

export default ChatBox;

// export default ChatBox;