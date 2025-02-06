const io = require("socket.io-client");
const headers = { transports: ["websocket"] };
const socket = io("http://localhost:3000", headers);

class SocketService {
  async getUsers(params) {
    return new Promise(async (resolve, reject) => {
      await socket.emit("users", params);
      await socket.on("users", (data) => resolve(data));
    });
  }
}

module.exports = new SocketService();
