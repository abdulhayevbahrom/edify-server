const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const groupValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 20 },
      capacity: { type: "number", minimum: 1 },
      group_teacher: {
        type: "object",
        properties: {
          teacher_id: { type: "string" },
          teacher_name: { type: "string" },
        },
        required: ["teacher_id", "teacher_name"],
        additionalProperties: false,
      },
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
      status: { type: "boolean" },
    },
    required: ["name", "status", "capacity", "group_teacher", "students"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: "Name is required",
        status: "Status is required",
        capacity: "Capacity is required",
        group_teacher: "Group teacher is required",
        students: "Students is required",
      },
      properties: {
        name: "Name must be a string",
        capacity: "Capacity must be a number",
        group_teacher: "Group teacher must be an object",
        students: "Students must be an array",
        status: "Status must be a boolean",
      },
    },
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return response.error(res, "Validation error", validate.errors);
  }
  next();
};

module.exports = groupValidation;
