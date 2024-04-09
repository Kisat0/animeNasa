import { useEffect, useState } from "react";
import Message from "./Message";

import "./PreviewChat.scss";

const PreviewChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5001");
    ws.onopen = () => {
        console.log("Connected to server");
        ws.send(JSON.stringify({ episode: "episode" }));
    };
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages([...messages, data]);
    };
  }, []);

  const sendMessage = () => {
    const message = document.querySelector(".preview-chat-input input").value;
    if (message) {
      setMessages([
        ...messages,
        {
          id: messages.length,
          message: message,
          time: new Date().toLocaleTimeString().slice(0, -3),
          username: "User",
          avatarUrl: "https://i.pravatar.cc/150?img=68",
        },
      ]);
      document.querySelector(".preview-chat-input input").value = "";
    }
  };
  return (
    <div className="preview-chat-container">
      <div className="preview-chat-content">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            time={message.time}
            username={message.username}
            avatarUrl={message.avatarUrl}
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
