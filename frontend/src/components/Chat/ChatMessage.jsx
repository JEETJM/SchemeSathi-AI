import "./ChatMessage.css";
import ReactMarkdown from "react-markdown";

function ChatMessage({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="bubble">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;