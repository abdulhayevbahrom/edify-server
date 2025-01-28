const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: Boolean, required: true },
    payment: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("education", schema);
