const Room = require("../models/room");

const broadcastToAll = (connections, data) => {
  if (connections) {
    for (const connection of connections) {
      connection.sendUTF(data);
    }
  }
};

const ws = (episode, receivedDataString, Rooms, Data) => {
  const receivedData = JSON.parse(receivedDataString);

  if (receivedData?.message) {
    Data[episode].chat.push(receivedData.message);

    broadcastToAll(
      Rooms.get(episode),
      JSON.stringify({
        chat: Data[episode].chat,
      })
    );
  }

  if (receivedData?.user) {
    if (
      !Data[episode]?.users.some((user) => {
        return receivedData?.user?._id === user._id;
      })
    ) {
      Data[episode].users.push(receivedData?.user);
    }

    broadcastToAll(
      Rooms.get(episode),
      JSON.stringify({
        users: Data[episode].users,
      })
    );
  }
};

const handleUserJoin = async (episode, connection, Rooms, Data) => {
  if (!Rooms.has(episode)) {
    Rooms.set(episode, new Set());
    Data[episode] = { users: [], chat: [] };
  }

  Rooms.get(episode).add(connection);

  connection.sendUTF(
    JSON.stringify({
      users: Data[episode].users,
      chat: Data[episode].chat,
    })
  );
};

const onClose = (connection, Rooms) => {
  for (const [episode, connectionsInRoom] of Rooms.entries()) {
    if (connectionsInRoom.has(connection)) {
      connectionsInRoom.delete(connection);
    }
  }
};

module.exports = {
  handleUserJoin,
  onClose,
  ws,
};
