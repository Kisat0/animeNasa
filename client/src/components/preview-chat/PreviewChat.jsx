import React from "react";

import "./PreviewChat.scss";

const PreviewChat = () => {
  return (
    <div className="preview-chat-container">
      <div className="preview-chat-content">
        <h1>Chat</h1>
        <p>
          Bienvenue sur le chat d'AnimeNation, ici vous pouvez discuter avec
          d'autres membres de la communauté.
        </p>
        <p>
          Pour accéder au chat, connectez-vous à votre compte ou inscrivez-vous
          si vous n'en avez pas encore.
        </p>
      </div>
    </div>
  );
};
export default PreviewChat;
