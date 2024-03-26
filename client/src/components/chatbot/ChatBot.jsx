import React, { useEffect } from "react";
import "./ChatBot.scss";

const ChatBotFrame = () => {
  return (
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/UE3hxvd1dv4bbFSTMgjWQ"
      title="Chatbot"
      className="chatbot-iframe"
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
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatbotContainer = document.querySelector(".chatbot-container");
      if (
        chatbotContainer &&
        !chatbotContainer.contains(event.target) &&
        isOpen &&
        event.target.className !== "chatbot-button"
      ) {
        closeChatbot();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="chatbot-page-container">
        <div className="chatbot-container">
          {!isOpen && (
            <div className="chatbot-button" onClick={openChatbot}>
              <span className="material-symbols-outlined">chat</span>
            </div>
          )}
          {isOpen && (
            <div className="chatbot-content">
              <ChatBotFrame />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
