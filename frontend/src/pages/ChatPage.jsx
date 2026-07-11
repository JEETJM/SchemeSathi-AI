import Navbar from "../components/Navbar/Navbar";
import ChatBox from "../components/Chat/ChatBox";

function ChatPage() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          paddingTop: "100px",
          paddingBottom: "60px",
        }}
      >
        <ChatBox />
      </div>
    </>
  );
}

export default ChatPage;
