import React, { useEffect } from "react";
import "./ChatBot.scss";

const ChatBotFrame = () => {
  return (
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/UE3hxvd1dv4bbFSTMgjWQ"
      title="Chatbot"
      width="40%"
      className="chatbot-iframe"
      style={{ height: "100%", minHeight: "700px", border: "none" }}
    ></iframe>
  );
};

export const ChatBot = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const openChatbot = () => {
        setIsOpen(true);
    };

    const closeChatbot = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className === "chatbot-container") {
                closeChatbot();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }
    , []);

  return (
      <div className="chatbot-button" onClick={openChatbot}>
          Open
      </div>
  );
};
