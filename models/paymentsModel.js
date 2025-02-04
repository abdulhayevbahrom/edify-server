const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "Student" },
    amount: { type: Number, required: true },
    edu_id: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    paymentType: {
      type: String,
      enum: ["cash", "transfer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("payment", paymentSchema);
