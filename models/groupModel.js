const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    group_teacher: {
      type: Object,
      propertis: {
        teacher_id: { type: String, required: true },
        teacher_name: { type: String, required: true },
      },
    },
    students: [
      {
        student_id: { type: String, required: true },
      },
    ],
    status: { type: Boolean, required: true },
    edu_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Group", groupSchema);
