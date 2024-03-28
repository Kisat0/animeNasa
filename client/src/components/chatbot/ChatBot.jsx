import React, { useEffect } from "react";
import "./ChatBot.scss";

const ChatBotFrame = () => {
  return (
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/odKfMk0UqdwaYAt_jHdN8"
      title="Chatbot"
      className="chatbot-iframe"
    ></iframe>
  );
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openChatbot = () => {
    if (isOpen) return;
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
        <div
          className="chatbot-container"
          style={{
            height: isOpen ? "500px" : "",
            width: isOpen ? "400px" : "",
          }}
        >
          {!isOpen && (
            <div className="chatbot-button" onClick={openChatbot}></div>
          )}
          <div
            className="chatbot-content"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <ChatBotFrame />
          </div>
        </div>
      </div>
    </>
  );
};
