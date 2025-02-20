const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: Array, required: true },
    address: { type: String },
    passport_id: { type: String, required: true },
    parents_phone: { type: String },
    birthDate: { type: String },
    student_group: {
      group_id: { type: String, required: true },
      group_name: { type: String, required: true },
      payment: { type: Number, required: true },
    },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", schema);
