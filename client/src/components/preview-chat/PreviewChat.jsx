import { useEffect, useState } from "react";
import Message from "./Message";

import "./PreviewChat.scss";
import { useUser } from "../../utils/useUser";

const PreviewChat = ({ episode }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5001");

    ws.onopen = () => {
      console.log("Connected to server");
      setWs(ws);
      ws.send(
        JSON.stringify({ type: "join", episode: episode._id, user: user._id })
      );
    };
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages(data.chat);
    };

    document
      .querySelector(".preview-chat-input input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const message = document.querySelector(".preview-chat-input input").value;
    if (message) {
      ws.send(
        JSON.stringify({
          type: "message",
          episode: episode._id,
          message: {
            id: messages.length,
            message: message,
            time: new Date().toLocaleTimeString().slice(0, -3),
            username: user.username,
            avatarUrl: user.avatar,
            userId: user._id,
          },
        })
      );
      document.querySelector(".preview-chat-input input").value = "";
    }
  };
  return (
    <div className="preview-chat-container">
      <div className="preview-chat-content">
        {messages.length > 0 &&
          messages.map((message) => (
            <Message
              key={message.id}
              message={message.message}
              time={message.time}
              username={message.username}
              avatarUrl={message.avatarUrl}
              userId={message.userId}
            />
          ))}
      </div>
      <div className="preview-chat-input">
        <input type="text" placeholder="Envoyer un message" />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};
export default PreviewChat;
