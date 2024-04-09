import { Avatar } from "@mui/material";
import { useUser } from "../../utils/useUser";

const Message = ({ message, time, username, avatarUrl, userId }) => {
  const { user } = useUser();
  return (
    <div className="preview-chat-message">
      <div className="preview-chat-message-avatar">
        <Avatar src={avatarUrl} />
      </div>
      <div className="preview-chat-message-user">
        <div className="preview-chat-message-user-name">
          <p>{username}</p>
          <p>{time}</p>
        </div>
        <p className="preview-chat-message-user-message">{message}</p>
      </div>
    </div>
  );
};

export default Message;
