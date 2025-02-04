// const users = [
//   {
//     id: 1,
//     name: "John",
//     room: "A",
//   },
//   {
//     id: 2,
//     name: "Doe",
//     room: "B",
//   },
// ];

// class soket {
//   async connect(io) {
//     io.on("connection", async (socket) => {
//       // get users
//       socket.on("users", async () => {
//         socket.emit("users", users);
//         console.log("connected");
//       });

//       // disconnect a user
//       socket.on("disconnect", async () => {
//         console.log("disconnected");
//       });
//     });
//   }
// }

// module.exports = new soket();

const users = [
  {
    id: 1,
    name: "John",
    room: "A",
  },
  {
    id: 2,
    name: "Doe",
    room: "B",
  },
];

class Socket {
  connect(io) {
    io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      // Foydalanuvchilarni qaytarish
      socket.on("users", () => {
        socket.emit("users", users);
      });

      // Foydalanuvchini ajratish
      socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
      });
    });
  }
}

module.exports = new Socket();
