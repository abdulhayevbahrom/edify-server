const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);

const { error } = require("../utils/response");
const AttendanceValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      student_id: { type: "string" },
      group_id: { type: "string" },
      date: { type: "string", format: "date" },
      status: { type: "string" },
      reason: { type: "string" },
    },
    required: ["student_id", "group_id", "date", "status"],
    additionalProperties: false,
    errorMessage: {
      required: {
        student_id: "student_id is required",
        group_id: "group_id is required",
        date: "date is required",
        status: "status is required",
      },
      properties: {
        student_id: "student_id must be a string",
        group_id: "group_id must be a string",
        date: "date must be a string",
        status: "status must be a string",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);
  if (!result) {
    return error(res, validate.errors[0].message);
  }

  next();
};
