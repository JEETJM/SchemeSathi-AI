import "./ChatMessage.css";
import ReactMarkdown from "react-markdown";

function ChatMessage({ sender, text }) {
  return (
    <div className={`chat-message ${sender}`}>
      <div className="chat-bubble">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;
