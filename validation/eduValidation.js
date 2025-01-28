const Ajv = require("ajv");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const eduValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 20 },
      phone: { type: "string", minLength: 9, maxLength: 9 },
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
      status: { type: "boolean" },
      payment: { type: "number", minimum: 0 },
    },
    required: ["name", "phone", "login", "password", "address", "status"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: "Name is required",
        phone: "Phone is required",
        login: "Login is required",
        password: "Password is required",
        address: "Address is required",
        status: "Status is required",
        payment: "Payment is required",
      },
      properties: {
        name: "Name must be between 3 and 20 characters",
        phone: "Phone must be 9 digits",
        login: "Login must be between 6 and 15 characters",
        password: "Password must be between 8 and 15 characters",
        address: "Address must be between 3 and 50 characters",
        payment: "Payment must be a number greater than or equal to 0",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);

  if (!result) return response.error(res, validate.errors[0].message);
  next();
};

module.exports = eduValidation;
