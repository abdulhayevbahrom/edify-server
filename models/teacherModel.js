const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: Array, required: true },
    address: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    socialNetworks: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      telegram: { type: String, default: null },
      tiktok: { type: String, default: null },
      youtube: { type: String, default: null },
    },
    specialty: { type: String, required: true },
    salary: { type: Number, required: true, default: 0 },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Teacher", schema);
