import { useState } from "react";
import API from "../services/api";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [schemes, setSchemes] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await API.post("/chat", {
        message,
      });

      setReply(res.data.reply);
      setSchemes(res.data.matched || []);
    } catch (error) {
      console.error(error);
      setReply("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>SchemeSathi AI 🇮🇳</h1>

      <textarea
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about any Government Scheme..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button onClick={sendMessage}>Ask AI</button>

      <hr />

      <h3>Gemma Reply</h3>

      <p>{reply}</p>

      <hr />

      <h3>Recommended Schemes</h3>

      {schemes.length === 0 ?
        <p>No schemes found.</p>
      : schemes.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h4>{item.name}</h4>

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>State:</strong> {item.state}
            </p>

            <p>
              <strong>Eligibility:</strong> {item.eligibility}
            </p>

            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Visit Official Website
            </a>
          </div>
        ))
      }
    </div>
  );
}

export default ChatBox;
