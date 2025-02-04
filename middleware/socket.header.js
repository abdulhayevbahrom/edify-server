// const { Server } = require("socket.io");
// const io = (server) => {
//   return new Server(server, {
//     cors: { origin: "*" },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   });
// };

// module.exports = io;

const { Server } = require("socket.io");

const io = (server) => {
  return new Server(server, {
    cors: {
      origin: "*", // Agar frontend localhost:3000 bo'lsa, shu yerga qo'shing
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
};

module.exports = io;
