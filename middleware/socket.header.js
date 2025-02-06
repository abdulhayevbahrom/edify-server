const { Server } = require("socket.io");
const io = (server) => {
  return new Server(server, {
    cors: { origin: "*" },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
};

module.exports = io;
