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
      login: {
        type: "string",
        minLength: 6,
        maxLength: 15,
        pattern: "^[a-zA-Z0-9]{6,15}$",
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 15,
        pattern: "^[a-zA-Z0-9]{8,15}$",
      },
      address: { type: "string", minLength: 3, maxLength: 50 },
      grade: { type: "string", minLength: 1, maxLength: 10 },
      guardian: { type: "object" },
    },
    required: ["fullname", "login", "password", "address", "grade"],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullname: "Fullname is required",
        login: "Login is required",
        password: "Password is required",
        address: "Address is required",
        grade: "Grade is required",
      },
      properties: {
        fullname: "Fullname must be between 3 and 50 characters",
        login: "Login must be between 6 and 15 characters",
        password: "Password must be between 8 and 15 characters",
        address: "Address must be between 3 and 50 characters",
        grade: "Grade must be between 1 and 11 characters",
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
