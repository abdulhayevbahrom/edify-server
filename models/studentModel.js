const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: Array, required: true },
    address: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    grade: { type: String, required: true },
    guardian: {
      fullname: { type: String, required: true },
      phone: { type: String, required: true },
      relation: { type: String, required: true },
    },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", schema);
