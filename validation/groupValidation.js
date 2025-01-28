const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const groupValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2 },
      capacity: { type: "number", minimum: 1 },
      room_number: { type: "number", minimum: 1 },
      group_teacher: {
        type: "object",
        properties: {
          teacher_id: { type: "string" },
          teacher_name: { type: "string" },
        },
        required: ["teacher_id", "teacher_name"],
        additionalProperties: false,
      },
      specialty: { type: "string" },
      students: {
        type: "array",
        items: {
          type: "object",
          properties: {
            student_id: { type: "string" },
          },
          required: ["student_id"],
          additionalProperties: false,
        },
      },
    },
    required: ["name", "capacity", "group_teacher"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: "Name is required",
        capacity: "Capacity is required",
        group_teacher: "Group teacher is required",
        students: "Students is required",
        room_number: "Room number is required",
        specialty: "Specialty is required",
      },
      properties: {
        name: "Name must be a string",
        capacity: "Capacity must be a number",
        group_teacher: "Group teacher must be an object",
        students: "Students must be an array",
        room_number: "Room number must be a number",
        specialty: "Specialty must be a string",
      },
    },
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return response.error(res, validate.errors[0].message, validate.errors);
  }
  next();
};

module.exports = groupValidation;
