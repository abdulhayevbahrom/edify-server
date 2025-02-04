const { Schema, model } = require("mongoose");

const attendanceSchema = new Schema(
  {
    // mongo id
    student_id: { type: Schema.Types.ObjectId, ref: "Student" },
    group_id: { type: Schema.Types.ObjectId, ref: "Group" },
    date: { type: String, required: true, default: Date.now() },
    status: {
      type: String,
      required: true,
      enum: ["present", "absent", "reason"],
    },
    reason: { type: String },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Attendance", attendanceSchema);
