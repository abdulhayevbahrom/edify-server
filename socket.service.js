const io = require("socket.io-client");
const headers = { transports: ["websocket"] };
const socket = io("http://localhost:8080", headers);

// socket.emit("users");
// socket.on("users", (data) => console.log(data));

class SocketService {
  // get users
  async getUsers(params) {
    return new Promise(async (resolve, reject) => {
      await socket.emit("users", params);
      await socket.on("users", (data) => resolve(data));
    });
  }
}

module.exports = new SocketService();
