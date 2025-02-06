const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const teacherValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      fullname: { type: "string", minLength: 3, maxLength: 50 },
      phone: { type: "array" },
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
      socialNetworks: { type: "object" },
      specialty: { type: "string", minLength: 3, maxLength: 50 },
      salary: { type: "number", minimum: 0 },
    },
    required: [
      "fullname",
      "phone",
      "login",
      "password",
      "address",
      "specialty",
      "salary",
    ],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullname: "Fullname is required",
        phone: "Phone is required",
        login: "Login is required",
        password: "Password is required",
        address: "Address is required",
        specialty: "Specialty is required",
        salary: "Salary is required",
      },
      properties: {
        fullname: "Fullname must be between 3 and 50 characters",
        phone: "Phone must be 9 digits",
        login: "Login must be between 6 and 15 characters",
        password: "Password must be between 8 and 15 characters",
        address: "Address must be between 3 and 50 characters",
        specialty: "Specialty must be between 3 and 50 characters",
        salary: "Salary must be a number greater than or equal to 0",
      },
    },
  };

  const validate = ajv.compile(schema);
  let data = JSON.parse(JSON.stringify(req.body));
  data.socialNetworks = JSON.parse(data.socialNetworks);
  data.phone = JSON.parse(data.phone);
  data.salary = parseInt(data.salary);

  const result = validate(data);
  if (!result) {
    return response.error(res, "Validation error", validate.errors[0].message);
  }
  next();
};

module.exports = teacherValidation;
