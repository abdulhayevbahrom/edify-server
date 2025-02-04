const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: String, required: true },
    message: { type: String, required: true },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
