const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const studentValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      fullname: { type: "string", minLength: 3, maxLength: 50 },
      phone: { type: "array" },
      address: { type: "string", minLength: 3, maxLength: 50 },
      passport_id: { type: "string", minLength: 9, maxLength: 9 },
      parents_phone: { type: "string", minLength: 9, maxLength: 9 },
      birthDate: { type: "string", minLength: 8, maxLength: 8 },
      student_group: { type: "object" },
    },
    required: ["fullname", "passport_id", "phone", "student_group"],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullname: "Fullname is required",
        passport_id: "Passport id is required",
        phone: "phone is required",
        student_group: "student_group is required",
      },
      properties: {
        fullname: "Fullname must be between 3 and 50 characters",
        password: "Password must be between 8 and 15 characters",
        address: "Address must be between 3 and 50 characters",
        passport_id: "passport id must be 9 characters",
        parents_phone: "parents phone number must be 9 digits",
        birthDate: "birth date must be string",
        student_group: "student_group must be an object",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);
  if (!result) {
    return response.error(res, "Validation error", validate.errors[0].message);
  }
  next();
};

module.exports = studentValidation;
