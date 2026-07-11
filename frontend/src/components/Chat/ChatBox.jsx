import { useState } from "react";
import API from "../../services/api";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const userMessage = message;

      const res = await API.post("/chat", {
        message: userMessage,
      });

      setReply(res.data.reply);
      setSchemes(res.data.matched);

      setChatHistory((prev) => [
        ...prev,
        {
          user: userMessage,
          ai: res.data.reply,
        },
      ]);

      setMessage("");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h1 className="text-center mb-3">SchemeSathi AI</h1>

              <p className="text-center text-muted">
                Find Government Schemes instantly using AI
              </p>

              <textarea
                className="form-control"
                rows="5"
                placeholder="Example: I am a student from West Bengal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button
                className="btn btn-primary mt-3 w-100"
                onClick={sendMessage}
              >
                Ask AI
              </button>

              {loading && (
                <div className="text-center mt-4">
                  <div className="spinner-border text-primary"></div>

                  <p className="mt-2">Gemma is thinking...</p>
                </div>
              )}

              {!loading && reply && (
                <>
                  <hr />

                  <h4>🤖 AI Response</h4>

                  <div className="alert alert-success">{reply}</div>
                  <hr />

                  <h4 className="mb-3">💬 Chat History</h4>

                  {chatHistory.map((chat, index) => (
                    <div key={index} className="mb-4">
                      <div className="alert alert-primary">
                        <strong>👤 You</strong>

                        <br />

                        {chat.user}
                      </div>

                      <div className="alert alert-success">
                        <strong>🤖 SchemeSathi AI</strong>

                        <br />

                        {chat.ai}
                      </div>
                    </div>
                  ))}

                  <h4 className="mt-4">📋 Recommended Schemes</h4>

                  {schemes.map((scheme, index) => (
                    <div key={index} className="card mt-3 border-success">
                      <div className="card-body">
                        <h5>{scheme.name}</h5>

                        <p>
                          <b>Category:</b> {scheme.category}
                        </p>

                        <p>
                          <b>State:</b> {scheme.state}
                        </p>

                        <p>
                          <b>Eligibility:</b> {scheme.eligibility}
                        </p>

                        <a
                          href={scheme.link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success"
                        >
                          Visit Official Website
                        </a>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
