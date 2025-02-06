const MessageDB = require("../models/messageModel");
const response = require("../utils/response");

class messageController {
  async getMessages(req, res) {
    try {
      const messages = await MessageDB.find({ edu_id: req.edu.id });
      if (!messages.length) return response.notFound(res);
      return response.success(res, "Messages", messages);
    } catch (err) {
      return response.serverError(res, err.message);
    }
  }

  async createMessage(req, res) {
    try {
      let io = req.app.get("socket");
      let data = { ...req.body, edu_id: req.edu.id };
      const message = await MessageDB.create(data);
      if (!message) return response.error(res, "Message not created");
      response.created(res, "Message created", message);
      io.emit("new_message", message);
    } catch (err) {
      return response.serverError(res, err.message);
    }
  }
}

module.exports = new messageController();
