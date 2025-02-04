const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const paymentValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      student_id: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
      amount: { type: "number", minimum: 0 },
      description: { type: "string", maxLength: 200 },
      subject: { type: "string", maxLength: 100 },
      paymentType: {
        type: "string",
        enum: ["cash", "transfer"],
      },
    },
    required: ["student_id", "amount", "paymentType", "subject"],
    additionalProperties: false,
    errorMessage: {
      required: {
        student_id: "Student ID is required",
        amount: "Amount is required",
        paymentType: "Payment type is required",
        subject: "Subject is required",
      },
      properties: {
        student_id: "Student ID must be a valid ObjectId",
        amount: "Amount must be a non-negative number",
        subject: "Subject must be at most 100 characters",
        paymentType: "Payment type must be either 'cash' or 'transfer'",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);

  if (!result) return response.error(res, validate.errors[0].message);

  next();
};

module.exports = paymentValidation;
